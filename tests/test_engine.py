"""Executable examples for the nine-level travel prototype."""

from collections import Counter
from copy import deepcopy
from dataclasses import replace
import unittest

from tile_explorer.engine import (
    CAPACITY, LEVEL_COUNT, SYMBOLS, Game, GameError, Tile, blockers,
    find_solution, make_level, overlaps,
)


def flat_tiles(kinds, first_id=0):
    """Separate face-up tiles to isolate tray behavior from covering."""
    return [Tile(first_id + i, kind, i * 3.0, 20.0, 0) for i, kind in enumerate(kinds)]


def example_game(tiles, tray=(), *, status="playing"):
    game = Game()
    tiles, tray = tuple(tiles), list(tray)
    game.level = replace(game.level, tiles=tiles + tuple(tray), solution=(), pressure=6)
    game.board = {tile.id: tile for tile in tiles}
    game.tray = tray
    game.tray_order = [tile.id for tile in tray]
    game.status = status
    game.certificate = None
    return game


class EngineAssertions(unittest.TestCase):
    def assert_route_wins(self, game, route):
        """Check covering and tray occupancy independently of the engine."""
        initial_ids = set(game.board)
        self.assertEqual(len(route), len(initial_ids))
        self.assertEqual(set(route), initial_ids)
        for tile_id in route:
            self.assertEqual(game.status, "playing")
            tile = game.board[tile_id]
            self.assertFalse(any(
                other.z > tile.z and abs(other.x - tile.x) < 2
                and abs(other.y - tile.y) < 2
                for other in game.board.values()
            ))
            expected = Counter(held.kind for held in game.tray)
            expected[tile.kind] += 1
            if expected[tile.kind] == 3:
                del expected[tile.kind]
            self.assertLess(sum(expected.values()), CAPACITY)
            game.pick(tile_id)
            self.assertEqual(Counter(held.kind for held in game.tray), +expected)
        self.assertEqual(game.status, "won")
        self.assertFalse(game.board)
        self.assertEqual(game.tray, [])
        self.assertEqual(game.tray_order, [])

    def assert_rejected_unchanged(self, game, action):
        before = deepcopy(game.__dict__)
        with self.assertRaises(GameError):
            action()
        self.assertEqual(game.__dict__, before)

    def assert_all_faces_visible(self, tiles):
        """Independently subtract higher rectangles on the half-unit lattice."""
        masks = {}
        for tile in tiles:
            x, y = round(tile.x * 2), round(tile.y * 2)
            self.assertAlmostEqual(tile.x * 2, x)
            self.assertAlmostEqual(tile.y * 2, y)
            masks[tile.id] = {(x + dx, y + dy) for dx in range(4) for dy in range(4)}
        for tile in tiles:
            free = set(masks[tile.id])
            for other in tiles:
                if other.z > tile.z:
                    free.difference_update(masks[other.id])
            self.assertGreaterEqual(len(free), 4, f"Tile {tile.id} exposes less than 25% of its face")
            self.assertTrue(any(
                {(x, y), (x + 1, y), (x, y + 1), (x + 1, y + 1)} <= free
                for x, y in free
            ), f"Tile {tile.id} has no one-unit square available for the magic pen")


class GeneratedLevelTests(EngineAssertions):
    def test_nine_levels_increase_total_types_and_layer_depth(self):
        self.assertEqual(LEVEL_COUNT, 9)
        expected = zip(
            (12, 18, 24, 27, 30, 33, 36, 42, 48),
            (3, 4, 5, 6, 7, 8, 9, 10, 12),
            (1, 2, 2, 3, 3, 3, 3, 4, 4),
        )
        for number, (total, kinds, layers) in enumerate(expected, 1):
            with self.subTest(level=number):
                level = make_level(number)
                self.assertEqual(len(level.tiles), total)
                self.assertEqual(level.kinds, kinds)
                self.assertEqual(len({tile.kind for tile in level.tiles}), kinds)
                self.assertEqual(level.layers, layers)
                self.assertEqual(max(tile.z for tile in level.tiles) + 1, layers)

    def test_all_nine_levels_have_legal_witnesses_for_several_seeds(self):
        for seed in (0, 42, -1701, 20261019):
            for number in range(1, LEVEL_COUNT + 1):
                with self.subTest(seed=seed, level=number):
                    level = make_level(number, seed)
                    self.assertEqual(len(level.tiles) % 3, 0)
                    self.assertTrue(all(count % 3 == 0 for count in Counter(
                        tile.kind for tile in level.tiles).values()))
                    self.assertEqual(len({tile.id for tile in level.tiles}), len(level.tiles))
                    game = Game(number)
                    game.level = level
                    game.board = {tile.id: tile for tile in level.tiles}
                    game.certificate = level.solution
                    self.assert_route_wins(game, level.solution)

    def test_all_lower_cards_keep_a_real_visible_face_and_clickable_region(self):
        for number in range(1, LEVEL_COUNT + 1):
            with self.subTest(level=number):
                tiles = make_level(number).tiles
                self.assert_all_faces_visible(tiles)
                covered = sum(bool(ids) for ids in blockers({tile.id: tile for tile in tiles}).values())
                if number == 1:
                    self.assertEqual(covered, 0)
                else:
                    self.assertGreaterEqual(covered, len(tiles) // 4)

    def test_compact_floor_is_connected_and_upper_cards_bridge_neighbours(self):
        for seed in (0, 42, -1701, 20261019):
            for number in range(1, LEVEL_COUNT + 1):
                with self.subTest(seed=seed, level=number):
                    tiles = make_level(number, seed).tiles
                    self.assert_all_faces_visible(tiles)
                    self.assertLessEqual(max(t.x + 2 for t in tiles) - min(t.x for t in tiles), 10)
                    self.assertLessEqual(max(t.y + 2 for t in tiles) - min(t.y for t in tiles), 16)
                    floor = [tile for tile in tiles if tile.z == 0]
                    self.assertGreaterEqual(len(floor) * 3, len(tiles) * 2)
                    # Shared edges form one carpet; spaced diagonal piles fail
                    # this check even if each little pile has visible corners.
                    reached = {floor[0].id}
                    while True:
                        adjacent = {tile.id for tile in floor if any(
                            other.id in reached and (
                                (abs(tile.x - other.x) == 2 and tile.y == other.y)
                                or (abs(tile.y - other.y) == 2 and tile.x == other.x)
                            ) for other in floor
                        )}
                        updated = reached | adjacent
                        if updated == reached:
                            break
                        reached = updated
                    self.assertEqual(reached, {tile.id for tile in floor})
                    for tile in tiles:
                        same = [other for other in tiles if other.id != tile.id and other.z == tile.z]
                        self.assertFalse(any(
                            abs(tile.x - other.x) < 2 and abs(tile.y - other.y) < 2
                            for other in same
                        ), "Same-layer rectangles must not visually cover each other")
                        if tile.z:
                            below = [other for other in tiles if other.z < tile.z
                                     and abs(tile.x - other.x) < 2 and abs(tile.y - other.y) < 2]
                            self.assertGreaterEqual(len(below), 2)
                            self.assertTrue(any(other.z == tile.z - 1 for other in below))
                    if number > 1:
                        cx = (min(t.x for t in tiles) + max(t.x + 2 for t in tiles)) / 2
                        cy = (min(t.y for t in tiles) + max(t.y + 2 for t in tiles)) / 2
                        self.assertFalse(any(t.x < cx < t.x + 2 and t.y < cy < t.y + 2
                                             for t in tiles), "The central opening must stay visible")

    def test_final_board_distributes_48_tiles_over_four_interleaved_layers(self):
        tiles = make_level(9).tiles
        self.assertEqual(Counter(tile.z for tile in tiles), Counter({0: 32, 1: 9, 2: 5, 3: 2}))

    def test_three_cities_each_have_three_levels_and_sourced_postcards(self):
        for number in range(1, 10):
            with self.subTest(level=number):
                state = Game(number).state()
                chapter_index, chapter_level = divmod(number - 1, 3)
                self.assertEqual(state["theme"]["city"], ("巴黎", "京都", "纽约")[chapter_index])
                self.assertEqual(state["level_info"]["chapter_index"], chapter_index)
                self.assertEqual(state["level_info"]["chapter_level"], chapter_level + 1)
                self.assertEqual(len(state["theme"]["facts"]), 3)
                for fact in state["theme"]["facts"]:
                    self.assertTrue(fact["title"] and fact["text"] and fact["source_title"])
                    self.assertTrue(fact["source_url"].startswith("https://"))

    def test_catalog_contains_fruit_transport_and_pets(self):
        self.assertGreaterEqual(len(SYMBOLS), 18)
        self.assertEqual({symbol["category"] for symbol in SYMBOLS}, {"水果", "交通", "宠物"})
        self.assertEqual(len({symbol["code"] for symbol in SYMBOLS}), len(SYMBOLS))
        for number in range(1, 10):
            categories = {SYMBOLS[tile.kind]["category"] for tile in make_level(number).tiles}
            self.assertEqual(categories, {"水果", "交通", "宠物"})

    def test_generation_is_reproducible_and_seed_changes_layout(self):
        self.assertEqual(make_level(9, 99), make_level(9, 99))
        self.assertNotEqual(make_level(9, 99).tiles, make_level(9, 100).tiles)

    def test_level_bounds_reject_invalid_values(self):
        for value in (0, 10, 50, -1, True, False, 1.0, "1", None):
            with self.subTest(value=value), self.assertRaises(GameError):
                make_level(value)


class CoveringTests(EngineAssertions):
    def test_overlap_requires_positive_area_and_supports_fractional_offsets(self):
        tile = Tile(0, 0, 0.0, 0.0, 0)
        for x, y, expected in ((0, 0, True), (0.65, 0.65, True), (-1, -1, True),
                               (2, 0, False), (0, 2, False), (2, 2, False),
                               (-2, 0, False), (3, 1, False)):
            with self.subTest(x=x, y=y):
                other = Tile(1, 1, x, y, 3)
                self.assertEqual(overlaps(tile, other), expected)
                self.assertEqual(overlaps(other, tile), expected)

    def test_any_higher_layer_blocks_and_same_layer_does_not(self):
        low, same = Tile(0, 0, 0, 0, 0), Tile(1, 1, 0, 0, 0)
        high, edge = Tile(2, 2, 1, 1, 4), Tile(3, 3, 2, 0, 5)
        game = example_game((low, same, high, edge))
        self.assertEqual(blockers(game.board)[0], {2})
        self.assertEqual(blockers(game.board)[1], {2})
        self.assertEqual(set(game.available()), {3})
        self.assert_rejected_unchanged(game, lambda: game.pick(0))
        game.pick(3)
        self.assertEqual(game.available(), [2])
        game.pick(2)
        self.assertEqual(set(game.available()), {0, 1})

    def test_state_includes_blocked_cards_and_reports_their_positions(self):
        game = example_game((Tile(0, 0, 0, 0, 0), Tile(1, 1, 0.65, 0.65, 1)))
        tiles = {tile["id"]: tile for tile in game.state()["tiles"]}
        self.assertEqual({i: tile["blocked"] for i, tile in tiles.items()}, {0: True, 1: False})
        self.assertEqual((tiles[1]["x"], tiles[1]["y"]), (0.65, 0.65))


class TrayAndUndoTests(EngineAssertions):
    def test_invalid_ids_do_not_change_state(self):
        game = example_game(flat_tiles([0, 0, 0]))
        for tile_id in (True, False, 0.0, "0", None, -1, 99):
            with self.subTest(tile_id=tile_id):
                self.assert_rejected_unchanged(game, lambda: game.pick(tile_id))
        game.pick(0)
        self.assert_rejected_unchanged(game, lambda: game.pick(0))

    def test_tray_groups_same_kind_and_removes_exactly_a_triple(self):
        game = example_game(flat_tiles([0, 1, 0, 2, 1, 0]))
        for tile_id in range(5):
            game.pick(tile_id)
        self.assertEqual([tile.id for tile in game.tray], [0, 2, 1, 4, 3])
        game.pick(5)
        self.assertEqual([tile.id for tile in game.tray], [1, 4, 3])
        self.assertEqual(game.tray_order, [1, 3, 4])
        self.assertEqual(game.matches, 1)

    def test_seventh_tile_clears_a_triple_before_checking_loss(self):
        tray = flat_tiles([0, 0, 1, 1, 2, 2], first_id=10)
        game = example_game(flat_tiles([0, 1, 2]), tray)
        game.pick(0)
        self.assertEqual(game.status, "playing")
        self.assertEqual(len(game.tray), 4)
        self.assertEqual(game.peak, 7)
        game.pick(1)
        game.pick(2)
        self.assertEqual(game.status, "won")
        self.assertEqual(game.matches, 3)

    def test_undo_takes_latest_collected_tile_not_last_grouped_slot(self):
        tiles = flat_tiles([0, 1, 0, 2])
        game = example_game(tiles)
        for tile_id in (0, 1, 2):
            game.pick(tile_id)
        self.assertEqual([tile.id for tile in game.tray], [0, 2, 1])
        game.undo()
        self.assertEqual([tile.id for tile in game.tray], [0, 1])
        self.assertEqual(game.tray_order, [0, 1])
        self.assertEqual(game.board[2], tiles[2])

    def test_undo_never_restores_cleared_triples_or_rewinds_their_score(self):
        tiles = flat_tiles([0, 1, 0, 0, 2])
        game = example_game(tiles)
        for tile_id in (0, 1, 2, 3):
            game.pick(tile_id)
        self.assertEqual([tile.id for tile in game.tray], [1])
        score, matches = game.score, game.matches
        game.undo()
        self.assertEqual(game.tray, [])
        self.assertEqual(game.board[1], tiles[1])
        self.assertTrue({0, 2, 3}.isdisjoint(game.board))
        self.assertEqual(game.score, score)
        self.assertEqual(game.matches, matches)
        self.assert_rejected_unchanged(game, game.undo)

    def test_full_tray_loses_and_one_card_can_be_returned_to_its_position(self):
        tray = flat_tiles([0, 1, 2, 3, 4, 5], first_id=10)
        tiles = flat_tiles([6, 7])
        game = example_game(tiles, tray)
        game.pick(0)
        self.assertEqual(game.status, "lost")
        self.assertEqual(len(game.tray), 7)
        self.assert_rejected_unchanged(game, lambda: game.pick(1))
        game.undo()
        self.assertEqual(game.status, "playing")
        self.assertEqual(game.board[0], tiles[0])
        self.assertEqual(game.tray, tray)
        self.assertEqual(game.undo_uses, 1)

    def test_winning_match_has_no_tray_tile_to_undo(self):
        game = example_game(flat_tiles([0, 0, 0]))
        self.assert_route_wins(game, (0, 1, 2))
        self.assertGreater(game.score, 0)
        self.assertEqual(game.state()["stars"], 3)
        self.assert_rejected_unchanged(game, game.undo)
        self.assert_rejected_unchanged(game, lambda: game.pick(0))

    def test_empty_undo_is_rejected(self):
        game = Game()
        self.assertFalse(game.state()["can_undo"])
        self.assert_rejected_unchanged(game, game.undo)


class MagicTests(EngineAssertions):
    def test_magic_takes_a_covered_tile_without_energy_and_can_be_undone(self):
        low, high = Tile(0, 0, 0, 0, 0), Tile(1, 1, 0.65, 0.65, 1)
        game = example_game([low, high])
        self.assertTrue(game.state()["can_magic"])
        self.assert_rejected_unchanged(game, lambda: game.pick(0))
        game.magic(0)
        self.assertEqual(game.tray, [low])
        self.assertEqual(game.board, {1: high})
        self.assertEqual(game.magic_uses, 1)
        game.undo()
        self.assertEqual(game.board[0], low)
        self.assertEqual(game.tray, [])

    def test_magic_is_repeatable_and_only_accepts_covered_tiles(self):
        low, middle, high = (Tile(i, i, i * 0.65, i * 0.65, i) for i in range(3))
        game = example_game([low, middle, high])
        self.assert_rejected_unchanged(game, lambda: game.magic(2))
        game.magic(0)
        game.pick(1, penetrate=True)
        self.assertEqual(game.magic_uses, 2)
        self.assertEqual([tile.id for tile in game.tray], [0, 1])
        self.assertFalse(game.state()["can_magic"])

    def test_magic_third_tile_matches_normally_and_cannot_revive_that_triple(self):
        low, high = Tile(0, 0, 0, 0, 0), Tile(1, 1, 0.65, 0.65, 1)
        game = example_game([low, high], flat_tiles([0, 0], first_id=10))
        game.magic(0)
        self.assertEqual(game.tray, [])
        self.assertEqual(game.matches, 1)
        self.assertGreater(game.score, 0)
        self.assertEqual(game.board, {1: high})
        self.assert_rejected_unchanged(game, game.undo)


class RearrangementTests(EngineAssertions):
    def assert_rearrangement_preserves_and_wins(self, game):
        active = list(game.board.values()) + game.tray
        kinds = Counter(tile.kind for tile in active)
        ids = {tile.id for tile in active}
        positions = {tile.id: (tile.x, tile.y, tile.z) for tile in active}
        matches, score = game.matches, game.score
        game.shuffle()
        self.assertEqual(game.status, "playing")
        self.assertEqual(game.tray, [])
        self.assertEqual(game.tray_order, [])
        self.assertEqual(set(game.board), ids)
        self.assertEqual(Counter(tile.kind for tile in game.board.values()), kinds)
        self.assertNotEqual({tile.id: (tile.x, tile.y, tile.z)
                             for tile in game.board.values()}, positions)
        self.assertEqual((game.matches, game.score), (matches, score))
        self.assert_all_faces_visible(list(game.board.values()))
        self.assert_route_wins(game, game.certificate)

    def test_rearrangement_returns_tray_to_a_new_solvable_board(self):
        game = Game(9)
        for tile_id in game.level.solution[:5]:
            game.pick(tile_id)
        self.assert_rearrangement_preserves_and_wins(game)

    def test_rearrangement_recovers_from_a_full_tray_without_losing_tiles(self):
        game = example_game(flat_tiles(list(range(7)) * 3))
        for tile_id in range(7):
            game.pick(tile_id)
        self.assertEqual(game.status, "lost")
        self.assert_rearrangement_preserves_and_wins(game)

    def test_rearrangement_has_no_three_use_limit(self):
        game = Game(6)
        for expected in range(1, 7):
            game.shuffle()
            self.assertEqual(game.shuffle_uses, expected)
            self.assertTrue(game.certificate)
        self.assert_route_wins(game, game.certificate)

    def test_every_remaining_triple_count_rearranges_visibly_and_has_a_certificate(self):
        for total in range(3, 49, 3):
            with self.subTest(remaining=total):
                kinds = [group % len(SYMBOLS) for group in range(total // 3) for _ in range(3)]
                game = example_game(flat_tiles(kinds))
                game.level = replace(game.level, number=9, layers=4, pressure=6)
                self.assert_rearrangement_preserves_and_wins(game)

    def test_won_game_rejects_rearrangement(self):
        game = example_game([], status="won")
        self.assert_rejected_unchanged(game, game.shuffle)


class CertificateTests(EngineAssertions):
    def test_following_the_certificate_preserves_a_verified_remainder(self):
        game = Game(7)
        route = game.level.solution
        game.pick(route[0])
        self.assertEqual(game.certificate, route[1:])
        self.assert_route_wins(game, game.certificate)

    def test_an_alternative_pick_invalidates_the_original_certificate(self):
        game = Game(1)
        alternative = next(i for i in game.available() if i != game.certificate[0])
        game.pick(alternative)
        self.assertIsNone(game.certificate)

    def test_search_route_respects_an_existing_tray(self):
        game = example_game(flat_tiles([0, 1, 1, 1]), flat_tiles([0, 0], first_id=20))
        route = find_solution(game.board, game.tray)
        self.assertIsNotNone(route)
        self.assert_route_wins(game, route)

    def test_search_budget_and_empty_board_cases(self):
        game = example_game(flat_tiles([0, 0, 0]))
        self.assertIsNone(find_solution(game.board, game.tray, max_nodes=0))
        self.assertEqual(find_solution({}, []), ())
        self.assertIsNone(find_solution({}, flat_tiles([0])))


if __name__ == "__main__":
    unittest.main()
