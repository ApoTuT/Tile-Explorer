"""Compact, interleaved tile geometry with genuinely exposed lower faces.

A tile is two world units wide. Geometry is built on a half-unit lattice, so
the visible part of every rectangle can be checked exactly with sixteen cells.
The board is a connected five-column carpet with a central opening; upper
tiles bridge neighbours instead of forming separate diagonal piles.
"""

from __future__ import annotations

import math
import random


# These profiles preserve the nine lessons' existing card counts and depths.
_LEVEL_PROFILES = {
    (12, 1): (12,),
    (18, 2): (14, 4),
    (24, 2): (18, 6),
    (27, 3): (20, 5, 2),
    (30, 3): (22, 6, 2),
    (33, 3): (24, 6, 3),
    (36, 3): (26, 7, 3),
    (42, 4): (28, 8, 4, 2),
    (48, 4): (32, 9, 5, 2),
}


def _cells(x: int, y: int) -> frozenset[tuple[int, int]]:
    """The sixteen half-unit cells occupied by a two-unit tile."""
    return frozenset((x + dx, y + dy) for dx in range(4) for dy in range(4))


def _has_clickable_square(cells: set | frozenset) -> bool:
    """Retain at least 25% of the face and a full one-unit square to click."""
    return len(cells) >= 4 and any(
        {(x, y), (x + 1, y), (x, y + 1), (x + 1, y + 1)} <= cells
        for x, y in cells
    )


def _flat(total: int) -> list[tuple[float, float, int]]:
    columns = 3 if total <= 9 else 4 if total <= 12 else 5
    return [(float((i % columns) * 2), float((i // columns) * 2), 0)
            for i in range(total)]


def _profile(total: int, layers: int) -> tuple[int, ...]:
    if (total, layers) in _LEVEL_PROFILES:
        return _LEVEL_PROFILES[total, layers]
    # A few remaining triples need room to breathe rather than forced depth.
    depth = min(layers, max(1, total // 9))
    if total <= 12 or depth <= 1:
        return (total,)
    if depth == 2:
        bottom = max(12, math.ceil(total * 2 / 3) + 2)
        return (min(bottom, total - 2), total - min(bottom, total - 2))
    bottom = math.ceil(total * 2 / 3)
    remaining = total - bottom
    if depth == 3:
        top = max(2, remaining // 3)
        return bottom, remaining - top, top
    middle = math.ceil(remaining * .55)
    return bottom, middle, remaining - middle - 2, 2


def _floor(bottom: int):
    """Return a connected floor and the half-unit cells of its central hole."""
    for rows in range(3, 12):
        hole_rows = (2, 3, 4) if rows == 7 else tuple(range(1, rows - 1))
        holes = {(2, row) for row in hole_rows}
        floor = [(col * 4, row * 4, 0)
                 for row in range(rows) for col in range(5)
                 if (col, row) not in holes]
        if len(floor) < bottom:
            continue
        # Only trim outer corners: the two-wide side paths stay connected.
        corners = [(0, 0, 0), (16, (rows - 1) * 4, 0),
                   (16, 0, 0), (0, (rows - 1) * 4, 0)]
        extra = len(floor) - bottom
        if extra > len(corners):
            continue
        for corner in corners[:extra]:
            floor.remove(corner)
        hole_cells = frozenset().union(*(_cells(col * 4, row * 4) for col, row in holes))
        return floor, hole_cells, rows
    raise ValueError("The board is too large for the compact floor")


def _build(profile: tuple[int, ...], rng: random.Random):
    placed, hole, rows = _floor(profile[0])
    footprints = [_cells(x, y) for x, y, _ in placed]
    visible = list(footprints)
    candidates = [(x, y, _cells(x, y))
                  for y in range(rows * 4 - 3) for x in range(17)
                  if not _cells(x, y) & hole]
    for z, count in enumerate(profile[1:], 1):
        choices = list(candidates)
        rng.shuffle(choices)
        added = 0
        for x, y, face in choices:
            touching = [i for i, other in enumerate(footprints) if face & other]
            if any(placed[i][2] == z for i in touching):
                continue  # Same-layer overlap would disagree with game rules.
            below = [i for i in touching if placed[i][2] < z]
            if len(below) < 2 or not any(placed[i][2] == z - 1 for i in below):
                continue
            exposed = {i: visible[i] - face for i in below}
            if not all(_has_clickable_square(part) for part in exposed.values()):
                continue
            for i, part in exposed.items():
                visible[i] = part
            placed.append((x, y, z))
            footprints.append(face)
            visible.append(face)
            added += 1
            if added == count:
                break
        if added != count:
            return None
    return [(x / 2, y / 2, z) for x, y, z in placed]


def make_positions(total: int, layers: int, rng: random.Random) -> list[tuple[float, float, int]]:
    """Build a compact, reproducible board; no card is completely concealed.

    Every upper card bridges at least two lower cards, including one directly
    beneath its layer. The original full-size face remains naturally visible:
    no corner badge or second miniature symbol is necessary. Small shuffled
    remainders automatically use fewer layers. All searches have finite bounds.
    """
    if total <= 0:
        return []
    layers = max(1, min(int(layers), 4))
    profile = _profile(total, layers)
    positions = None
    while len(profile) > 1 and positions is None:
        for _ in range(8):
            positions = _build(profile, rng)
            if positions is not None:
                break
        if positions is None:
            # A fixed alternate ordering makes the rare unlucky greedy fill
            # reproducible without retrying indefinitely.
            for fallback_seed in range(4):
                positions = _build(profile, random.Random(fallback_seed))
                if positions is not None:
                    break
        if positions is None:
            profile = _profile(total, len(profile) - 1)
    if positions is None:
        positions = _flat(total)
    width = max(x for x, _, _ in positions)
    height = max(y for _, y, _ in positions)
    mirror_x, mirror_y = rng.choice((False, True)), rng.choice((False, True))
    positions = [(width - x if mirror_x else x, height - y if mirror_y else y, z)
                 for x, y, z in positions]
    rng.shuffle(positions)
    return positions
