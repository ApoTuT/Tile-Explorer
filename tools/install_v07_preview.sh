#!/usr/bin/env bash
# Run as codex after uploading the package and these two tools to incoming/BUILD.
set -euo pipefail
mode=${1:?stage or activate}
build=${2:?build id}
[[ "$build" =~ ^[0-9]{8}-v07r3-[0-9a-f]{8}$ ]]
root=/home/codex/apps/tile-explorer
incoming="$root/incoming/$build"
target="$root/public/tile-explorer/releases/$build"
cd "$incoming"
if [[ "$mode" == stage ]]; then
  test ! -e "$target"
  tar -xzf tile-explorer.tar.gz
  sha256sum -c SHA256SUMS
  mkdir -p "$root/public/tile-explorer/releases"
  cp -a html "$target"
  if [[ -e /etc/systemd/system/tile-explorer-preview.service ]]; then
    grep -Fq "$root/preview_v07_server.py" /etc/systemd/system/tile-explorer-preview.service
  fi
  install -m 644 preview_v07_server.py "$root/preview_v07_server.py"
  cat > "$incoming/tile-explorer-preview.service" <<EOF
[Unit]
Description=Tile Explorer public preview
After=network.target
[Service]
User=codex
WorkingDirectory=$root
ExecStart=/usr/bin/python3 $root/preview_v07_server.py --directory $root/public --selection $root/current.json --port 80
Restart=on-failure
AmbientCapabilities=CAP_NET_BIND_SERVICE
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=read-only
PrivateTmp=true
[Install]
WantedBy=multi-user.target
EOF
  sudo install -m 644 "$incoming/tile-explorer-preview.service" /etc/systemd/system/tile-explorer-preview.service
  sudo systemctl daemon-reload
  sudo systemctl enable tile-explorer-preview.service
  sudo systemctl restart tile-explorer-preview.service
  for attempt in {1..20}; do
    if curl --fail --silent --output /dev/null "http://127.0.0.1/tile-explorer/releases/$build/"; then exit 0; fi
    sleep 0.2
  done
  exit 1
elif [[ "$mode" == activate ]]; then
  test -f "$target/index.html"
  if [[ -f "$root/current.json" ]]; then cp "$root/current.json" "$incoming/current.before.json"; fi
  python3 - "$root" "$build" <<'PY'
import json, os, pathlib, sys
root=pathlib.Path(sys.argv[1])
candidate=root/'current.candidate.json'
candidate.write_text(json.dumps({'buildId':sys.argv[2]})+'\n')
os.replace(candidate,root/'current.json')
PY
  curl --fail --silent --head http://127.0.0.1/tile-explorer/
else
  exit 2
fi
