"""Reproducible short, gentle v0.2 musical cues. Standard library only.

Run: py -3.12 tools/generate_audio.py
All cues share a bright C-major pentatonic palette. No voices, animal/engine
imitations, noise, pitch sweeps, reverb, recordings or external samples are used.
"""
from __future__ import annotations

import hashlib
import json
import math
from pathlib import Path
import struct
import wave

RATE = 22050
ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / "web" / "assets" / "audio" / "v02"
TAU = 2 * math.pi
ATTACK_SECONDS = .008
RELEASE_SECONDS = .024
PEAK = .35
REVISION = "v02-gentle-pentatonic-1"

# Stable pitches and weak integer overtones keep every possible combination
# within one light musical family, including fruit, vehicle and pet tiles.
PITCHES = {
    "C5": 523.251131,
    "D5": 587.329536,
    "E5": 659.255114,
    "G5": 783.990872,
    "A5": 880.0,
    "C6": 1046.502261,
}
TIMBRES = {
    "bubble": ((1.0, .045, .008), 13.0),
    "wood": ((1.0, .13, .025), 17.0),
    "pluck": ((1.0, .085, .015), 15.0),
    "bell": ((1.0, .06, .012), 11.0),
}

# duration, notes (offset, pitch, duration, timbre), description
SOUNDS = {
    "apple": (.10, ((0, "E5", .10, "bubble"),), "Cheerful soft E5 bubble"),
    "banana": (.12, ((0, "G5", .12, "pluck"),), "Playful light G5 pluck"),
    "cherry": (.15, ((0, "E5", .10, "wood"), (.05, "G5", .10, "wood")),
               "Two friendly E5-G5 wooden notes"),
    "grape": (.13, ((0, "D5", .13, "bubble"),), "Delicate rounded D5 bubble"),
    "orange": (.11, ((0, "C5", .11, "wood"),), "Sunny rounded C5 wooden note"),
    "strawberry": (.14, ((0, "A5", .14, "bell"),), "Gentle sparkling A5 chime"),
    "car": (.10, ((0, "G5", .10, "wood"),), "Bouncy light G5 wooden note"),
    "taxi": (.15, ((0, "G5", .095, "bubble"), (.055, "A5", .095, "bubble")),
             "Friendly G5-A5 bubble greeting"),
    "bus": (.14, ((0, "C5", .09, "bell"), (.05, "E5", .09, "bell")),
            "Calm bright C5-E5 chime pair"),
    "train": (.13, ((0, "A5", .13, "pluck"),), "Airy cheerful A5 pluck"),
    "bicycle": (.12, ((0, "C6", .12, "bell"),), "Small clear C6 musical bell"),
    "scooter": (.11, ((0, "D5", .11, "pluck"),), "Nimble gentle D5 pluck"),
    "cat": (.12, ((0, "E5", .12, "bell"),), "Curious sweet E5 chime"),
    "dog": (.11, ((0, "G5", .11, "bubble"),), "Happy rounded G5 bubble"),
    "rabbit": (.09, ((0, "A5", .09, "wood"),), "Tiny light A5 wooden note"),
    "panda": (.14, ((0, "C5", .14, "bubble"),), "Relaxed soft C5 bubble"),
    "fox": (.10, ((0, "C6", .10, "pluck"),), "Bright quick C6 pluck"),
    "bear": (.13, ((0, "E5", .13, "wood"),), "Warm gentle E5 wooden note"),
}


def edge_window(t: float, duration: float) -> float:
    """Raised-cosine edges with zero slope; no clicks at either PCM boundary."""
    if t <= 0 or t >= duration:
        return 0.0
    attack = .5 - .5 * math.cos(math.pi * min(1.0, t / ATTACK_SECONDS))
    release = .5 - .5 * math.cos(
        math.pi * min(1.0, (duration - t) / RELEASE_SECONDS))
    return attack * release


def note(t: float, duration: float, pitch: str, timbre: str) -> float:
    if t <= 0 or t >= duration:
        return 0.0
    harmonics, decay = TIMBRES[timbre]
    phase = TAU * PITCHES[pitch] * t
    return edge_window(t, duration) * sum(
        amplitude * math.exp(-decay * t * (1 + .35 * harmonic))
        * math.sin((harmonic + 1) * phase)
        for harmonic, amplitude in enumerate(harmonics)
    )


def synthesize(code: str, duration: float) -> list[float]:
    notes = SOUNDS[code][1]
    count = round(duration * RATE)
    values = [sum(note(index / RATE - offset, length, pitch, timbre)
                  for offset, pitch, length, timbre in notes)
              for index in range(count)]
    # Remove tiny finite-window DC with the same smooth edges, preserving quiet
    # boundaries. Final endpoints are exactly zero after PCM quantization.
    weights = [edge_window(index / RATE, (count - 1) / RATE)
               for index in range(count)]
    correction = sum(values) / sum(weights)
    values = [value - correction * weight for value, weight in zip(values, weights)]
    values[0] = values[-1] = 0.0
    peak = max(abs(value) for value in values) or 1.0
    return [PEAK * value / peak for value in values]


def main() -> None:
    DESTINATION.mkdir(parents=True, exist_ok=True)
    assets = []
    for code, (duration, notes, description) in SOUNDS.items():
        path = DESTINATION / f"{code}.wav"
        samples = synthesize(code, duration)
        integers = [round(sample * 32767) for sample in samples]
        pcm = b"".join(struct.pack("<h", sample) for sample in integers)
        with wave.open(str(path), "wb") as output:
            output.setnchannels(1)
            output.setsampwidth(2)
            output.setframerate(RATE)
            output.writeframes(pcm)
        assets.append({
            "id": code,
            "path": f"/assets/audio/v02/{code}.wav",
            "duration_seconds": round(len(samples) / RATE, 6),
            "bytes": path.stat().st_size,
            "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
            "gain": 1.0,
            "peak_amplitude": round(max(abs(value) for value in integers) / 32767, 6),
            "rms_amplitude": round(math.sqrt(sum((value / 32767) ** 2
                                                 for value in integers) / len(integers)), 6),
            "notes": [pitch for _, pitch, _, _ in notes],
            "description": description,
            "source": "Original offline musical synthesis; tools/generate_audio.py; no external samples",
        })
    manifest = {
        "schema_version": 1,
        "revision": REVISION,
        "sound_palette": "Gentle C-major pentatonic: C5 D5 E5 G5 A5 C6; soft bubble, wood, pluck and bell cues",
        "notes": [
            "Short 90-150 ms musical cues; no voice, animal or mechanical imitations",
            "8 ms raised-cosine attack and 24 ms release; no noise, pitch sweeps, vibrato or reverb",
            "Only a fundamental and two weak integer harmonics; minimum fundamental 523.251131 Hz",
            "Peak amplitude 0.35 with silent PCM endpoints and DC removal",
            "Generated deterministically with Python standard library; no recordings or external samples",
        ],
        "format": "WAV mono PCM signed 16-bit little-endian",
        "sample_rate_hz": RATE,
        "generator": "tools/generate_audio.py (Python standard library)",
        "total_audio_bytes": sum(asset["bytes"] for asset in assets),
        "assets": assets,
    }
    (DESTINATION / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Generated {len(assets)} gentle musical cues: {manifest['total_audio_bytes']:,} bytes")
    print("Durations: " + ", ".join(
        f"{asset['id']}={asset['duration_seconds']}" for asset in assets))


if __name__ == "__main__":
    main()
