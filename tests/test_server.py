"""Exercise real local HTTP actions, city metadata, and saved progress."""

import http.cookiejar
import json
from pathlib import Path
import secrets
import threading
import unittest
from urllib.error import HTTPError
from urllib.request import build_opener, HTTPCookieProcessor, Request
from unittest.mock import patch

from tile_explorer.engine import Game, make_level
from tile_explorer.server import GameServer, Progress


class ServerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.qa_root = Path(__file__).resolve().parents[1] / ".qa"
        cls.qa_root.mkdir(exist_ok=True)
        cls.temp_path = cls.qa_root / ("http-test-" + secrets.token_hex(6))
        cls.temp_path.mkdir()
        cls.save = cls.temp_path / "progress.json"
        cls.server = GameServer(("127.0.0.1", 0), cls.save)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.url = f"http://127.0.0.1:{cls.server.server_port}"

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join(timeout=2)
        assert cls.temp_path.resolve().is_relative_to(cls.qa_root.resolve())
        for file in cls.temp_path.iterdir():
            file.unlink()
        cls.temp_path.rmdir()

    def setUp(self):
        self.client = build_opener(HTTPCookieProcessor(http.cookiejar.CookieJar()))

    def call(self, data=None, path="/api/state", headers=None):
        payload = json.dumps(data).encode() if data is not None else None
        request = Request(self.url + path, data=payload, headers=headers or {})
        try:
            response = self.client.open(request, timeout=5)
        except HTTPError as error:
            response = error
        return response.code, json.loads(response.read().decode())

    def test_sessions_are_isolated_and_refresh_keeps_board(self):
        _, state = self.call()
        available = next(tile for tile in state["tiles"] if not tile["blocked"])
        code, picked = self.call({"action": "pick", "tile_id": available["id"]}, "/api/action")
        self.assertEqual(code, 200)
        self.assertEqual(picked["moves"], 1)
        self.assertEqual(self.call()[1]["moves"], 1)
        other = build_opener(HTTPCookieProcessor(http.cookiejar.CookieJar()))
        self.assertEqual(json.loads(other.open(self.url + "/api/state").read())["moves"], 0)

    def test_presentation_is_returned_only_for_the_successful_pick(self):
        _, state = self.call()
        self.assertNotIn("presentation", state)
        available = next(tile for tile in state["tiles"] if not tile["blocked"])
        code, picked = self.call({"action": "pick", "tile_id": available["id"]}, "/api/action")
        self.assertEqual(code, 200)
        self.assertEqual(picked["presentation"], {"schema_version": 1, "events": [{
            "type": "tray_enter", "tile": {"id": available["id"], "kind": available["kind"]},
            "insert_index": 0,
            "tray_after_insert": [{"id": available["id"], "kind": available["kind"]}],
        }]})
        self.assertNotIn("presentation", self.call()[1])
        code, rejected = self.call({"action": "pick", "tile_id": available["id"]}, "/api/action")
        self.assertEqual(code, 400)
        self.assertNotIn("presentation", rejected)
        self.assertNotIn("presentation", rejected["state"])
        for data in ({"action": "undo"}, {"action": "shuffle"}, {"action": "restart"},
                     {"action": "level", "level": 2}):
            with self.subTest(data=data):
                code, result = self.call(data, "/api/action")
                self.assertEqual(code, 200)
                self.assertNotIn("presentation", result)

    def test_city_metadata_changes_every_three_levels(self):
        for number in range(1, 10):
            code, state = self.call({"action": "level", "level": number}, "/api/action")
            self.assertEqual(code, 200)
            self.assertEqual(state["level_count"], 9)
            self.assertEqual(state["theme"]["city"], ("巴黎", "京都", "纽约")[(number - 1) // 3])
            self.assertEqual(state["level_info"]["chapter_level"], (number - 1) % 3 + 1)
            self.assertEqual(len(state["theme"]["facts"]), 3)
            self.assertNotIn("mode", state)
            self.assertNotIn("energy", state)

    def test_three_tool_actions_use_the_new_rules(self):
        _, state = self.call({"action": "level", "level": 2}, "/api/action")
        covered = next(tile for tile in state["tiles"] if tile["blocked"])
        code, picked = self.call({"action": "magic", "tile_id": covered["id"]}, "/api/action")
        self.assertEqual(code, 200)
        self.assertEqual(picked["tray"], [{"id": covered["id"], "kind": covered["kind"]}])
        self.assertEqual(picked["stats"]["magic_uses"], 1)
        self.assertEqual(picked["presentation"], {"schema_version": 1, "events": [{
            "type": "tray_enter", "tile": {"id": covered["id"], "kind": covered["kind"]},
            "insert_index": 0, "tray_after_insert": picked["tray"],
        }]})
        code, undone = self.call({"action": "undo"}, "/api/action")
        self.assertEqual(code, 200)
        self.assertEqual(undone["tray"], [])
        self.assertNotIn("presentation", undone)
        returned = next(tile for tile in undone["tiles"] if tile["id"] == covered["id"])
        self.assertEqual(returned, covered)
        self.call({"action": "magic", "tile_id": covered["id"]}, "/api/action")
        code, shuffled = self.call({"action": "shuffle"}, "/api/action")
        self.assertEqual(code, 200)
        self.assertEqual(shuffled["tray"], [])
        self.assertNotIn("presentation", shuffled)
        self.assertEqual(len(shuffled["tiles"]), len(state["tiles"]))
        self.assertEqual(shuffled["stats"]["shuffle_uses"], 1)

    def test_complete_level_persists_progress_and_next_is_gated(self):
        self.call()
        code, error = self.call({"action": "next"}, "/api/action")
        self.assertEqual(code, 400)
        self.assertIn("state", error)
        for tile_id in make_level(1).solution:
            code, state = self.call({"action": "pick", "tile_id": tile_id}, "/api/action")
            self.assertEqual(code, 200)
        self.assertEqual(state["status"], "won")
        self.assertEqual([event["type"] for event in state["presentation"]["events"]],
                         ["tray_enter", "triple_clear"])
        entered, cleared = state["presentation"]["events"]
        self.assertEqual([tile["id"] for tile in entered["tray_after_insert"]], cleared["tile_ids"])
        self.assertEqual(state["tray"], [])
        self.assertEqual(state["progress"]["completed"]["1"]["stars"], 3)
        self.assertEqual(Progress(self.save).data["completed"]["1"]["stars"], 3)
        stored = json.loads(self.save.read_text(encoding="utf-8"))
        self.assertEqual(set(stored), {"completed"})
        self.assertTrue(all(set(record) == {"stars", "best_score"}
                            for record in stored["completed"].values()))
        self.assertNotIn("presentation", self.call()[1])
        code, next_state = self.call({"action": "next"}, "/api/action")
        self.assertEqual(code, 200)
        self.assertEqual(next_state["level"], 2)
        self.assertNotIn("presentation", next_state)

    def test_ninth_level_finishes_the_journey_without_entering_level_ten(self):
        self.call({"action": "level", "level": 9}, "/api/action")
        for tile_id in make_level(9).solution:
            code, state = self.call({"action": "pick", "tile_id": tile_id}, "/api/action")
            self.assertEqual(code, 200)
        self.assertEqual(state["status"], "won")
        code, error = self.call({"action": "next"}, "/api/action")
        self.assertEqual(code, 400)
        self.assertEqual(error["state"]["level"], 9)
        self.assertEqual(error["state"]["status"], "won")

    def test_restart_resets_only_current_game_and_keeps_the_city(self):
        _, state = self.call({"action": "level", "level": 5}, "/api/action")
        available = next(tile for tile in state["tiles"] if not tile["blocked"])
        self.call({"action": "pick", "tile_id": available["id"]}, "/api/action")
        _, restarted = self.call({"action": "restart"}, "/api/action")
        self.assertEqual(restarted["level"], 5)
        self.assertEqual(restarted["theme"]["city"], "京都")
        self.assertEqual(restarted["moves"], 0)
        self.assertEqual(restarted["tray"], [])
        self.assertEqual(restarted["tiles"], state["tiles"])

    def test_invalid_levels_and_removed_tool_actions_are_rejected(self):
        self.call()
        for data in ({"action": "level", "level": 0}, {"action": "level", "level": 10},
                     {"action": "level", "level": True}, {"action": "level", "level": "2"},
                     {"action": "mode", "mode": "classic"}, {"action": "echo", "tile_id": 0},
                     {"action": "hint"}, {"action": "pick", "tile_id": 999},
                     {"action": "unknown"}):
            with self.subTest(data=data):
                code, body = self.call(data, "/api/action")
                self.assertEqual(code, 400)
                self.assertIn("error", body)
                self.assertNotIn("presentation", body)
                self.assertNotIn("presentation", body["state"])
                self.assertEqual(body["state"]["level"], 1)
                self.assertEqual(body["state"]["moves"], 0)

    def test_foreign_origin_and_host_are_rejected(self):
        self.assertEqual(self.call({"action": "restart"}, "/api/action",
                                  {"Origin": "https://example.com"})[0], 403)
        self.assertEqual(self.call(headers={"Host": "example.com"})[0], 403)

    def test_static_routes_do_not_expose_project_files(self):
        self.assertEqual(self.call(path="/main.py")[0], 404)
        self.assertEqual(self.call(path="/../tile_explorer/engine.py")[0], 404)

    def test_tile_atlas_is_served_as_a_local_png(self):
        with self.client.open(self.url + "/assets/tile-atlas-v3.png", timeout=5) as response:
            self.assertEqual(response.code, 200)
            self.assertEqual(response.headers.get_content_type(), "image/png")
            self.assertEqual(response.read(8), b"\x89PNG\r\n\x1a\n")
        self.assertEqual(self.call(path="/assets/../main.py")[0], 404)

    def test_theater_scripts_have_exact_static_routes(self):
        # Isolate routing from asset production; actual JS content is checked by frontend QA.
        payload = b"window.TileTheater = {};"
        for name in ("tray-content.js", "tray-director.js", "audio-manager.js"):
            with self.subTest(name=name), patch.object(Path, "read_bytes", autospec=True,
                                                      return_value=payload) as read:
                with self.client.open(self.url + "/" + name, timeout=5) as response:
                    self.assertEqual(response.code, 200)
                    self.assertEqual(response.headers.get_content_type(), "text/javascript")
                    self.assertEqual(response.read(), payload)
                read.assert_called_once_with(Path(__file__).resolve().parents[1] / "web" / name)
        for path in ("/tray-content.js.map", "/theater.js", "/web/tray-content.js"):
            with self.subTest(path=path), patch.object(Path, "read_bytes") as read:
                self.assertEqual(self.call(path=path)[0], 404)
                read.assert_not_called()

    def test_theater_audio_allows_only_the_eighteen_wav_paths(self):
        codes = ("apple", "banana", "cherry", "grape", "orange", "strawberry",
                 "car", "taxi", "bus", "train", "bicycle", "scooter",
                 "cat", "dog", "rabbit", "panda", "fox", "bear")
        payload = b"RIFF\x00\x00\x00\x00WAVE"
        for code in codes:
            path = f"/assets/audio/v02/{code}.wav"
            with self.subTest(path=path), patch.object(Path, "read_bytes", autospec=True,
                                                      return_value=payload) as read:
                with self.client.open(self.url + path, timeout=5) as response:
                    self.assertEqual(response.code, 200)
                    self.assertEqual(response.headers.get_content_type(), "audio/wav")
                    self.assertEqual(response.read(), payload)
                read.assert_called_once_with(Path(__file__).resolve().parents[1] / "web" / path.lstrip("/"))
        for path in ("/assets/audio/v02/", "/assets/audio/v02/unknown.wav",
                     "/assets/audio/v02/apple.mp3", "/assets/audio/v02/apple.wav/extra",
                     "/assets/audio/v02/../apple.wav", "/assets/audio/v02/%2e%2e/server.py"):
            with self.subTest(path=path), patch.object(Path, "read_bytes") as read:
                self.assertEqual(self.call(path=path)[0], 404)
                read.assert_not_called()

    def test_malformed_and_oversized_requests_are_rejected(self):
        for body in (b"{oops", b"[]", b"x" * 16385):
            request = Request(self.url + "/api/action", data=body)
            with self.assertRaises(HTTPError) as raised:
                self.client.open(request, timeout=5)
            self.assertEqual(raised.exception.code, 400)
            self.assertIn("error", json.loads(raised.exception.read()))

    def test_damaged_legacy_and_out_of_range_saves_do_not_prevent_start(self):
        path = self.temp_path / "damaged.json"
        for content in ("{oops", "[]", '{"classic": {"1": {"stars": 3, "best_score": 1000}}}',
                        '{"completed": {"1": {"stars": 99, "best_score": 5}}}',
                        '{"completed": {"10": {"stars": 3, "best_score": 500}}}'):
            with self.subTest(content=content):
                path.write_text(content, encoding="utf-8")
                self.assertEqual(Progress(path).data, {"completed": {}})

    def test_failed_save_retries_even_when_score_is_unchanged(self):
        path = self.temp_path / "retry.json"
        progress = Progress(path)
        game = Game()
        for tile_id in game.level.solution:
            game.pick(tile_id)
        with patch.object(Path, "write_text", side_effect=OSError("temporary write failure")):
            progress.record(game)
        self.assertTrue(progress.dirty)
        self.assertTrue(progress.warning)
        progress.record(game)
        self.assertFalse(progress.dirty)
        self.assertFalse(progress.warning)
        self.assertEqual(Progress(path).data["completed"]["1"]["best_score"], game.score)


if __name__ == "__main__":
    unittest.main()
