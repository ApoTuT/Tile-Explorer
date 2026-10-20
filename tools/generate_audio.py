"""Reproducible original v0.2 cartoon foley. Python standard library only.

Run: py -3.12 tools/generate_audio.py
No recordings, external samples, network requests or runtime synthesis are used.
"""
from __future__ import annotations

import hashlib
import json
import math
from pathlib import Path
import random
import struct
import wave

RATE = 22050
ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / "web" / "assets" / "audio" / "v02"
TAU = 2 * math.pi


def envelope(t: float, duration: float, attack: float = 0.008) -> float:
    if t < 0 or t >= duration:
        return 0.0
    return min(1.0, t / attack) * math.sin(math.pi * t / duration) ** 0.65


def tone(t: float, duration: float, start: float, end: float | None = None,
         harmonics: tuple[float, ...] = (1.0,), vibrato: float = 0) -> float:
    if t < 0 or t >= duration:
        return 0.0
    end = start if end is None else end
    phase = TAU * (start * t + (end - start) * t * t / (2 * duration))
    phase += vibrato * math.sin(TAU * 22 * t)
    return envelope(t, duration) * sum(amp * math.sin((n + 1) * phase)
                                       for n, amp in enumerate(harmonics))


def bell(t: float, duration: float, pitch: float) -> float:
    if t < 0 or t >= duration:
        return 0.0
    return envelope(t, duration, .002) * math.exp(-t * 12) * (
        math.sin(TAU * pitch * t) + .35 * math.sin(TAU * pitch * 2.71 * t)
        + .14 * math.sin(TAU * pitch * 4.13 * t))


def voice(t: float, duration: float, pitch: float, end: float,
          formants: tuple[float, float], rasp: float = 0) -> float:
    """A tiny voiced cartoon syllable with two resonant formants, not speech."""
    if t < 0 or t >= duration:
        return 0.0
    progress = t / duration
    fundamental = pitch + (end - pitch) * progress
    phase = TAU * (pitch * t + (end - pitch) * t * t / (2 * duration))
    phase += .08 * math.sin(TAU * 25 * t)
    value = 0.0
    for harmonic in range(1, 24):
        frequency = fundamental * harmonic
        strength = .16 / harmonic
        for formant in formants:
            strength += math.exp(-.5 * ((frequency - formant) / 170) ** 2) / 3
        value += strength * math.sin(harmonic * phase)
    return envelope(t, duration) * value * (1 + rasp * math.sin(TAU * 43 * t))


SOUNDS = {
    "apple": (.14, "Energetic bright bubble pop"),
    "banana": (.21, "Playful descending rubber slide"),
    "cherry": (.23, "Two coordinated cherry plucks"),
    "grape": (.25, "Three timid soft bubble trembles"),
    "orange": (.17, "Round confident low bounce"),
    "strawberry": (.25, "Shy soft sparkling chime"),
    "car": (.16, "Impatient short two-tone horn"),
    "taxi": (.25, "Friendly double greeting horn"),
    "bus": (.28, "Steady two-note door chime"),
    "train": (.31, "Proud breathy cartoon whistle"),
    "bicycle": (.28, "Light metallic bicycle bell"),
    "scooter": (.25, "Mischievous short engine rev"),
    "cat": (.30, "Curious rising then falling cartoon meow"),
    "dog": (.22, "Enthusiastic raspy cartoon woof"),
    "rabbit": (.15, "Cautious delicate squeak"),
    "panda": (.32, "Sleepy low nasal murmur"),
    "fox": (.20, "Clever bright upward yip"),
    "bear": (.27, "Warm rounded low hum"),
}


def synthesize(code: str, duration: float) -> list[float]:
    rng = random.Random("tile-explorer-v02:" + code)
    values = []
    for index in range(round(duration * RATE)):
        t = index / RATE
        noise = rng.uniform(-1, 1)
        if code == "apple":
            value = tone(t, .14, 1150, 260, (1, .25)) + noise * .04 * math.exp(-t * 100)
        elif code == "banana":
            value = tone(t, .21, 620, 180, (1, .18, .1), .5)
        elif code == "cherry":
            value = bell(t, .12, 890) + bell(t - .10, .13, 1120)
        elif code == "grape":
            value = sum(.65 * tone(t - offset, .075, pitch, pitch * .5, (1, .1))
                        for offset, pitch in ((0, 610), (.08, 730), (.16, 550)))
        elif code == "orange":
            value = tone(t, .17, 330, 110, (1, .26, .1))
        elif code == "strawberry":
            value = .65 * bell(t, .25, 1320) + .25 * bell(t - .07, .18, 1760)
        elif code == "car":
            value = tone(t, .16, 440, 425, (1, .4, .2)) + .4 * tone(t, .16, 555)
        elif code == "taxi":
            value = sum(tone(t - offset, .10, 520, 560, (1, .3))
                        for offset in (0, .14))
        elif code == "bus":
            value = .75 * bell(t, .16, 660) + .8 * bell(t - .12, .16, 440)
        elif code == "train":
            value = (tone(t, .31, 750, 900, (1, .12), .1)
                     + .4 * tone(t, .31, 1120, 1350)
                     + noise * .1 * envelope(t, .31))
        elif code == "bicycle":
            value = bell(t, .28, 1680) + .35 * bell(t - .055, .225, 1650)
        elif code == "scooter":
            value = tone(t, .25, 75, 190, (1, .55, .35, .22, .15), .8)
            value = math.tanh(value * 1.5) * (1 + .1 * noise)
        elif code == "cat":
            # A connected high "mee-ow" changing from narrow to round formants.
            fraction = t / duration
            formants = (1650 - 1000 * fraction, 2600 - 1600 * fraction)
            value = voice(t, .30, 460, 310, formants)
        elif code == "dog":
            value = voice(t, .20, 165, 105, (520, 1100), .5)
            value += noise * .12 * envelope(t, .12, .004)
        elif code == "rabbit":
            value = .65 * tone(t, .15, 1400, 1950, (1, .1), .2)
        elif code == "panda":
            value = voice(t, .32, 105, 88, (280, 720), .1)
        elif code == "fox":
            value = voice(t, .20, 510, 830, (1250, 2350), .12)
        else:
            value = voice(t, .27, 135, 100, (400, 850))
        values.append(value)
    peak = max(abs(value) for value in values) or 1
    # Consistent headroom; a small end fade guarantees click-free PCM boundaries.
    return [.70 * value / peak * min(1, (len(values) - 1 - n) / 80)
            for n, value in enumerate(values)]


def main() -> None:
    DESTINATION.mkdir(parents=True, exist_ok=True)
    assets = []
    for code, (duration, description) in SOUNDS.items():
        path = DESTINATION / f"{code}.wav"
        samples = synthesize(code, duration)
        pcm = b"".join(struct.pack("<h", round(sample * 32767)) for sample in samples)
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
            "description": description,
            "source": "Original offline procedural synthesis; tools/generate_audio.py; no external samples",
        })
    manifest = {
        "schema_version": 1,
        "format": "WAV mono PCM signed 16-bit little-endian",
        "sample_rate_hz": RATE,
        "generator": "tools/generate_audio.py (Python standard library)",
        "seed": "tile-explorer-v02:{code}",
        "total_audio_bytes": sum(asset["bytes"] for asset in assets),
        "assets": assets,
    }
    (DESTINATION / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Generated {len(assets)} original sounds: {manifest['total_audio_bytes']:,} bytes")


if __name__ == "__main__":
    main()
