"""Loopback-only HTTP adapter for the Python rules engine."""

from __future__ import annotations

from http.cookies import SimpleCookie
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import secrets
import threading
from urllib.parse import urlsplit

from .engine import Game, GameError, LEVEL_COUNT
from .assets import load_merge_manifest


ROOT = Path(__file__).resolve().parent.parent
THEATER_AUDIO_CODES = (
    "apple", "banana", "cherry", "grape", "orange", "strawberry",
    "car", "taxi", "bus", "train", "bicycle", "scooter",
    "cat", "dog", "rabbit", "panda", "fox", "bear",
)
STATIC_FILES = {
    **{"/" + name: name for name in load_merge_manifest().files},
    "/": "index.html", "/index.html": "index.html", "/app.js": "app.js", "/style.css": "style.css",
    "/tray-content.js": "tray-content.js", "/tray-director.js": "tray-director.js",
    "/audio-manager.js": "audio-manager.js",
    "/assets/tile-atlas-v3.png": "assets/tile-atlas-v3.png",
    **{f"/assets/audio/v02/{code}.wav": f"assets/audio/v02/{code}.wav"
       for code in THEATER_AUDIO_CODES},
}
STATIC_MIME = {
    ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8", ".png": "image/png", ".wav": "audio/wav",
    ".svg": "image/svg+xml", ".json": "application/json; charset=utf-8",
}


class Progress:
    def __init__(self, path: Path):
        self.path = path
        self.data = {"completed": {}}
        self.warning = ""
        self.dirty = False
        try:
            raw = json.loads(path.read_text(encoding="utf-8"))
            # A damaged or externally modified save must not prevent startup.
            for section in self.data:
                entries = raw.get(section, {})
                if not isinstance(entries, dict):
                    continue
                for key, record in entries.items():
                    if str(key) not in {str(i) for i in range(1, LEVEL_COUNT + 1)}:
                        continue
                    if not isinstance(record, dict):
                        continue
                    stars, score = record.get("stars"), record.get("best_score")
                    if (type(stars) is int and 1 <= stars <= 3 and
                            type(score) is int and 0 <= score <= 1000000):
                        self.data[section][key] = {"stars": stars, "best_score": score}
        except FileNotFoundError:
            pass
        except (OSError, ValueError, AttributeError):
            self.warning = "进度文件无法读取，本次从空记录开始。"

    def record(self, game: Game):
        key = str(game.level.number)
        records = self.data["completed"]
        previous = records.get(key, {"stars": 0, "best_score": 0})
        updated = {"stars": max(previous["stars"], game.stars),
                   "best_score": max(previous["best_score"], game.score)}
        if previous == updated and not self.dirty:
            return
        records[key] = updated
        self.dirty = True
        try:
            self.path.parent.mkdir(parents=True, exist_ok=True)
            temporary = self.path.with_suffix(".tmp")
            temporary.write_text(json.dumps(self.data, ensure_ascii=False, indent=2), encoding="utf-8")
            temporary.replace(self.path)
            self.warning = ""
            self.dirty = False
        except OSError:
            self.warning = "本次通关已记录在内存中，但进度文件无法写入。"


class GameServer(ThreadingHTTPServer):
    daemon_threads = True

    def __init__(self, address, progress_path: Path | None = None):
        super().__init__(address, Handler)
        self.sessions: dict[str, Game] = {}
        self.lock = threading.RLock()
        self.progress = Progress(progress_path or ROOT / ".local" / "travel-progress-v2.json")


class Handler(BaseHTTPRequestHandler):
    server: GameServer

    def log_message(self, format, *args):
        # Keep the launcher quiet; errors are shown in the browser.
        pass

    def _send(self, status, payload, content_type="application/json; charset=utf-8", cookie=None):
        if not isinstance(payload, bytes):
            payload = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; script-src 'self'; connect-src 'self'; frame-ancestors 'none'")
        if cookie:
            self.send_header("Set-Cookie", f"tile_session={cookie}; HttpOnly; SameSite=Strict; Path=/")
        self.end_headers()
        self.wfile.write(payload)

    def _session(self):
        cookie = SimpleCookie()
        try:
            cookie.load(self.headers.get("Cookie", ""))
            sid = cookie["tile_session"].value if "tile_session" in cookie else ""
        except Exception:
            sid = ""
        new_cookie = None
        if sid not in self.server.sessions:
            # Local browser sessions are isolated; only completed records are shared.
            if len(self.server.sessions) >= 128:
                self.server.sessions.pop(next(iter(self.server.sessions)))
            sid = secrets.token_urlsafe(24)
            self.server.sessions[sid] = Game()
            new_cookie = sid
        return sid, self.server.sessions[sid], new_cookie

    def _state(self, game):
        state = game.state()
        state["progress"] = self.server.progress.data
        if self.server.progress.warning:
            state["save_warning"] = self.server.progress.warning
        return state

    def _trusted_host(self):
        hostname = self.headers.get("Host", "")
        allowed = {f"127.0.0.1:{self.server.server_port}", f"localhost:{self.server.server_port}"}
        return hostname in allowed

    def do_GET(self):
        if not self._trusted_host():
            self._send(403, {"error": "只允许本机访问。"})
            return
        path = urlsplit(self.path).path
        if path == "/api/state":
            with self.server.lock:
                _, game, cookie = self._session()
                self._send(200, self._state(game), cookie=cookie)
            return
        if path not in STATIC_FILES:
            self._send(404, {"error": "页面不存在。"})
            return
        file = ROOT / "web" / STATIC_FILES[path]
        mime = STATIC_MIME[file.suffix]
        try:
            self._send(200, file.read_bytes(), mime)
        except OSError:
            self._send(503, {"error": "界面文件尚未就绪。"})

    def do_POST(self):
        if not self._trusted_host():
            self._send(403, {"error": "只允许本机访问。"})
            return
        origin = self.headers.get("Origin")
        if origin and origin not in (f"http://127.0.0.1:{self.server.server_port}",
                                     f"http://localhost:{self.server.server_port}"):
            self._send(403, {"error": "不接受其他页面发来的操作。"})
            return
        if urlsplit(self.path).path != "/api/action":
            self._send(404, {"error": "接口不存在。"})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if not 0 < length <= 16384:
                raise ValueError
            data = json.loads(self.rfile.read(length).decode("utf-8"))
            if not isinstance(data, dict):
                raise ValueError
        except (ValueError, UnicodeDecodeError):
            self._send(400, {"error": "操作格式不正确。"})
            return
        with self.server.lock:
            sid, game, cookie = self._session()
            try:
                action = data.get("action")
                events = None
                if action == "pick":
                    events = game.pick(data.get("tile_id"))
                elif action == "magic":
                    events = game.magic(data.get("tile_id"))
                elif action in ("undo", "shuffle"):
                    getattr(game, action)()
                elif action == "restart":
                    game = Game(game.level.number)
                elif action == "level":
                    game = Game(data.get("level"))
                elif action == "next":
                    if game.status != "won":
                        raise GameError("通关后即可进入下一关，也可直接选关练习。")
                    if game.level.number >= LEVEL_COUNT:
                        raise GameError("九关旅程完成！可以重访任意城市。")
                    game = Game(game.level.number + 1)
                else:
                    raise GameError("未知操作。")
                self.server.sessions[sid] = game
                if game.status == "won":
                    self.server.progress.record(game)
                state = self._state(game)
                if events is not None:
                    state["presentation"] = {"schema_version": 1, "events": events}
                self._send(200, state, cookie=cookie)
            except GameError as error:
                self._send(400, {"error": str(error), "state": self._state(game)}, cookie=cookie)
