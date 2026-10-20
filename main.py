"""Run with Python 3.10+: python main.py (no installation required)."""

import argparse
import threading
import webbrowser

from tile_explorer.server import GameServer


def main():
    parser = argparse.ArgumentParser(description="Tile Explorer / 叠叠环游记")
    parser.add_argument("--port", type=int, default=8765, help="local port; 0 selects a free port")
    parser.add_argument("--no-browser", action="store_true", help="do not open the browser automatically")
    args = parser.parse_args()
    if not 0 <= args.port <= 65535:
        parser.error("port must be between 0 and 65535")
    try:
        server = GameServer(("127.0.0.1", args.port))
    except OSError as error:
        if args.port == 8765:
            try:
                server = GameServer(("127.0.0.1", 0))
                print("Port 8765 is unavailable; a free local port was selected.")
            except OSError as fallback_error:
                print(f"Unable to start the local server: {fallback_error}")
                return 1
        else:
            print(f"Unable to start on port {args.port}: {error}")
            print("Try: python main.py --port 0")
            return 1
    url = f"http://127.0.0.1:{server.server_port}"
    print(f"Tile Lab is ready: {url}")
    print("Keep this window open while playing. Press Ctrl+C to stop.")
    if not args.no_browser:
        opener = threading.Timer(0.4, webbrowser.open, args=(url,))
        opener.daemon = True
        opener.start()
    try:
        server.serve_forever(poll_interval=0.3)
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
