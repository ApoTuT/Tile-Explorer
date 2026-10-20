"""Nine travel puzzles, with authoritative rules written in pure Python.

Every initial/rearranged board has an executable winning certificate. Dense
base tiles and interleaved bridge tiles leave natural visible face regions.
"""

from __future__ import annotations

from collections import Counter
from dataclasses import dataclass, replace
import random
import time

from .content import THEMES
from .geometry import make_positions


SYMBOLS = tuple(
    {"name": name, "color": color, "code": code, "category": category}
    for category, entries in (
        ("水果", (("苹果", "apple", "#dd646a"), ("香蕉", "banana", "#e0b645"),
                  ("樱桃", "cherry", "#ce5673"), ("葡萄", "grape", "#9368b5"),
                  ("橙子", "orange", "#e69944"), ("草莓", "strawberry", "#df657c"))),
        ("交通", (("汽车", "car", "#5b9bc8"), ("出租车", "taxi", "#d4aa3d"),
                  ("巴士", "bus", "#66a18d"), ("火车", "train", "#ac7aa8"),
                  ("自行车", "bicycle", "#6e9f9c"), ("踏板车", "scooter", "#d68969"))),
        ("宠物", (("猫咪", "cat", "#cf9a6a"), ("狗狗", "dog", "#b98764"),
                  ("兔子", "rabbit", "#bd8ea5"), ("熊猫", "panda", "#667981"),
                  ("狐狸", "fox", "#d7905c"), ("小熊", "bear", "#ac856d"))),
    ) for name, code, color in entries
)
LEVEL_COUNT = 9
CAPACITY = 7
COUNTS = (12, 18, 24, 27, 30, 33, 36, 42, 48)
KINDS = (3, 4, 5, 6, 7, 8, 9, 10, 12)
LAYERS = (1, 2, 2, 3, 3, 3, 3, 4, 4)
PRESSURES = (3, 3, 4, 4, 4, 5, 5, 6, 6)


class GameError(ValueError):
    """An invalid player action, explained in the player's language."""


@dataclass(frozen=True)
class Tile:
    id: int
    kind: int
    x: float
    y: float
    z: int


@dataclass(frozen=True)
class Level:
    number: int
    title: str
    chapter: str
    kinds: int
    layers: int
    pressure: int
    tiles: tuple[Tile, ...]
    solution: tuple[int, ...]


def overlaps(a: Tile, b: Tile) -> bool:
    """A tile is 2×2 units; touching edges do not cover another tile."""
    return abs(a.x - b.x) < 2 - 1e-9 and abs(a.y - b.y) < 2 - 1e-9


def blockers(tiles: dict[int, Tile]) -> dict[int, set[int]]:
    return {i: {j for j, other in tiles.items() if other.z > tile.z and overlaps(tile, other)}
            for i, tile in tiles.items()}


def removal_order(tiles: dict[int, Tile], rng: random.Random) -> list[int]:
    cover = blockers(tiles)
    alive = set(tiles)
    order = []
    while alive:
        choices = sorted(i for i in alive if not cover[i] & alive)
        chosen = rng.choice(choices)
        alive.remove(chosen)
        order.append(chosen)
    return order


def safe_kind_order(pool: Counter, pressure: int, rng: random.Random) -> list[int]:
    """Construct a triple sequence with sufficient buffer to finish groups."""
    remaining, held, sequence = +pool, Counter(), []
    occupied = 0
    while remaining:
        candidates, weights = [], []
        for kind in sorted(remaining):
            trial = held.copy()
            trial[kind] = (trial[kind] + 1) % 3
            after, largest = sum(trial.values()), max(trial.values(), default=0)
            if after > pressure or occupied + 1 > CAPACITY or (after and after + 2 - largest > pressure):
                continue
            candidates.append(kind)
            weights.append(1 if held[kind] == 2 else 2 if held[kind] else 3)
        if not candidates:
            raise RuntimeError("Tile schedule lost its constructive invariant")
        kind = rng.choices(candidates, weights=weights, k=1)[0]
        sequence.append(kind)
        held[kind] = (held[kind] + 1) % 3
        occupied = sum(held.values())
        remaining[kind] -= 1
        if not remaining[kind]:
            del remaining[kind]
    return sequence


def make_level(number: int, seed: int = 20261019) -> Level:
    if type(number) is not int or not 1 <= number <= LEVEL_COUNT:
        raise GameError("请选择 1–9 关。")
    rng = random.Random(seed + number * 104729)
    index, chapter_index = number - 1, (number - 1) // 3
    theme = THEMES[chapter_index]
    positions = make_positions(COUNTS[index], LAYERS[index], rng)
    tiles = {i: Tile(i, 0, *position) for i, position in enumerate(positions)}
    order = removal_order(tiles, rng)
    palette = [0, 6, 12, 1, 7, 13, 2, 8, 14, 3, 9, 15, 4, 10, 16, 5, 11, 17]
    rotation = chapter_index * 3
    palette = (palette[rotation:] + palette[:rotation])[:KINDS[index]]
    pool = Counter()
    for group in range(COUNTS[index] // 3):
        pool[palette[group % len(palette)]] += 3
    for tile_id, kind in zip(order, safe_kind_order(pool, PRESSURES[index], rng)):
        tiles[tile_id] = replace(tiles[tile_id], kind=kind)
    names = (("塞纳河初见", "铁塔下的午后", "巴黎漫游"),
             ("樱花小径", "古都来信", "庭院寻踪"),
             ("港湾晨光", "城市节拍", "自由岛终章"))
    return Level(number, names[chapter_index][index % 3], theme["city"], KINDS[index],
                 LAYERS[index], PRESSURES[index], tuple(tiles.values()), tuple(order))


def find_solution(board: dict[int, Tile], tray: list[Tile], capacity: int = CAPACITY,
                  max_nodes: int = 18000, max_seconds: float = 0.22) -> tuple[int, ...] | None:
    """Internal verification helper; None also means a search budget expired."""
    if len(tray) >= capacity:
        return None
    tiles = list(board.values())
    if not tiles:
        return () if not tray else None
    cover = blockers(board)
    index = {tile.id: i for i, tile in enumerate(tiles)}
    masks = [sum(1 << index[j] for j in cover[tile.id]) for tile in tiles]
    counts = [0] * len(SYMBOLS)
    for tile in tray:
        counts[tile.kind] += 1
    visited, nodes, started = set(), 0, time.perf_counter()

    class SearchLimit(Exception):
        pass

    def search(mask, held):
        nonlocal nodes
        nodes += 1
        if nodes > max_nodes or (nodes % 64 == 0 and time.perf_counter() - started > max_seconds):
            raise SearchLimit
        if not mask:
            return () if not any(held) else None
        key = (mask, held)
        if key in visited:
            return None
        visited.add(key)
        occupied = sum(held)
        choices = [i for i in range(len(tiles)) if mask & (1 << i) and not masks[i] & mask]
        choices.sort(key=lambda i: (held[tiles[i].kind] == 2, held[tiles[i].kind] == 1), reverse=True)
        for i in choices:
            kind = tiles[i].kind
            if occupied + 1 >= capacity and held[kind] != 2:
                continue
            updated = list(held)
            updated[kind] = (updated[kind] + 1) % 3
            result = search(mask ^ (1 << i), tuple(updated))
            if result is not None:
                return (tiles[i].id,) + result
        return None
    try:
        return search((1 << len(tiles)) - 1, tuple(counts))
    except SearchLimit:
        return None


class Game:
    def __init__(self, level: int = 1):
        self.level = make_level(level)
        self.board = {tile.id: tile for tile in self.level.tiles}
        self.tray: list[Tile] = []
        self.tray_order: list[int] = []
        self.status = "playing"
        self.moves = self.matches = self.peak = self.score = 0
        self.assists = self.magic_uses = self.undo_uses = self.shuffle_uses = 0
        self.certificate: tuple[int, ...] | None = self.level.solution
        self.message = "三张同类自动消除。底牌图案可见，先移开上层，或用魔法笔直接拾取。"

    def available(self) -> list[int]:
        cover = blockers(self.board)
        return [tile_id for tile_id in self.board if not cover[tile_id]]

    def pick(self, tile_id: int, penetrate: bool = False) -> list[dict]:
        """Apply the complete move and return its one-shot presentation facts."""
        if self.status != "playing":
            raise GameError("本局已结束，可以撤回槽内一张牌、整体重排，或重新选关。")
        if type(tile_id) is not int or tile_id not in self.board:
            raise GameError("这张牌已不在棋盘上。")
        covered = bool(blockers(self.board)[tile_id])
        if penetrate and not covered:
            raise GameError("这张牌没有被压住，直接点击就能拾取。")
        if covered and not penetrate:
            raise GameError("底牌可以看见，但仍被压住；先移走上层，或点亮魔法笔再点它。")
        if penetrate:
            self.magic_uses += 1
            self.assists += 1
        tile = self.board.pop(tile_id)
        same = [i for i, held in enumerate(self.tray) if held.kind == tile.kind]
        insert_index = same[-1] + 1 if same else len(self.tray)
        self.tray.insert(insert_index, tile)
        # Copy before elimination: the third actor may not exist in final state.
        events = [{
            "type": "tray_enter",
            "tile": {"id": tile.id, "kind": tile.kind},
            "insert_index": insert_index,
            "tray_after_insert": [{"id": held.id, "kind": held.kind} for held in self.tray],
        }]
        self.tray_order.append(tile.id)
        self.moves += 1
        self.peak = max(self.peak, len(self.tray))
        matched = sum(held.kind == tile.kind for held in self.tray) == 3
        if matched:
            tile_ids = [held.id for held in self.tray if held.kind == tile.kind]
            events.append({"type": "triple_clear", "kind": tile.kind, "tile_ids": tile_ids})
            removed = set(tile_ids)
            self.tray = [held for held in self.tray if held.id not in removed]
            self.tray_order = [i for i in self.tray_order if i not in removed]
            self.matches += 1
            self.score += 100 + (CAPACITY - len(self.tray)) * 10
        self.certificate = (self.certificate[1:] if self.certificate and self.certificate[0] == tile_id else None)
        if not self.board and not self.tray:
            self.status = "won"
            self.score += 500
            self.message = "全部消除！收好这张城市明信片，继续下一段旅行。"
        elif len(self.tray) >= CAPACITY:
            self.status = "lost"
            self.message = "七个槽位已满。撤回一张，或整体重新排布，接着试。"
        elif penetrate:
            self.message = "魔法笔已把被压住的牌放入暂存槽。" + ("刚好凑成三张，消除了！" if matched else "")
        elif matched:
            self.message = "三张消除！再看看刚刚露出的牌。"
        else:
            self.message = "留意槽中已有的图案，给下一组三张留出空间。"
        return events

    def magic(self, tile_id: int) -> list[dict]:
        return self.pick(tile_id, penetrate=True)

    def undo(self):
        if not self.tray:
            raise GameError("暂存槽里还没有牌可撤回；已消除的三张不会恢复。")
        newest = next(i for i in reversed(self.tray_order) if any(tile.id == i for tile in self.tray))
        tile = next(tile for tile in self.tray if tile.id == newest)
        self.tray.remove(tile)
        self.tray_order.remove(newest)
        self.board[tile.id] = tile
        self.undo_uses += 1
        self.assists += 1
        self.status = "playing"
        self.certificate = None
        self.message = f"已将暂存槽里最近加入的「{SYMBOLS[tile.kind]['name']}」退回原位置；已消除的牌不变。"

    def shuffle(self):
        if self.status == "won":
            raise GameError("本关已经清空，进入下一关或重新选关吧。")
        active = dict(self.board)
        active.update((tile.id, tile) for tile in self.tray)
        rng = random.Random(self.level.number * 300007 + self.moves * 97 + self.shuffle_uses * 1009 + 1)
        positions = make_positions(len(active), self.level.layers, rng)
        ids = sorted(active)
        rng.shuffle(ids)
        rearranged = {i: replace(active[i], x=x, y=y, z=z) for i, (x, y, z) in zip(ids, positions)}
        route = removal_order(rearranged, rng)
        sequence = safe_kind_order(Counter(tile.kind for tile in active.values()), self.level.pressure, rng)
        self.board = {i: replace(rearranged[i], kind=kind) for i, kind in zip(route, sequence)}
        self.tray, self.tray_order = [], []
        self.shuffle_uses += 1
        self.assists += 1
        self.status = "playing"
        self.certificate = tuple(route)
        self.message = "棋盘和暂存槽里的剩余牌已整体重新排布，图案数量不变，可以继续消除。"

    @property
    def stars(self):
        return 1 + int(self.peak <= 5) + int(self.assists == 0)

    def state(self) -> dict:
        cover = blockers(self.board)
        chapter_index = (self.level.number - 1) // 3
        return {
            "level": self.level.number, "level_count": LEVEL_COUNT, "status": self.status,
            "theme": THEMES[chapter_index],
            "tiles": [{"id": tile.id, "kind": tile.kind, "x": tile.x, "y": tile.y,
                       "z": tile.z, "blocked": bool(cover[tile.id])} for tile in self.board.values()],
            "tray": [{"id": tile.id, "kind": tile.kind} for tile in self.tray],
            "total": len(self.level.tiles), "remaining": len(self.board) + len(self.tray),
            "moves": self.moves, "matches": self.matches, "peak": self.peak,
            "capacity": CAPACITY, "score": self.score, "can_undo": bool(self.tray),
            "can_magic": self.status == "playing" and any(cover.values()),
            "message": self.message,
            "level_info": {"title": self.level.title, "chapter": self.level.chapter,
                           "kinds": self.level.kinds, "layers": self.level.layers,
                           "pressure": self.level.pressure,
                           "difficulty": ("初见", "轻松", "渐入", "观察", "思考", "进阶", "挑战", "巧思", "终章")[self.level.number - 1],
                           "chapter_level": (self.level.number - 1) % 3 + 1,
                           "chapter_index": chapter_index},
            "stats": {"assists": self.assists, "magic_uses": self.magic_uses,
                      "undo_uses": self.undo_uses, "shuffle_uses": self.shuffle_uses},
            "stars": self.stars if self.status == "won" else 0,
            "symbols": list(SYMBOLS),
        }
