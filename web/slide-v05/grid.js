/* Integer board geometry; no DOM or animation coordinates enter the rules. */
(function (root) {
  'use strict';
  const directions = Object.freeze({up: Object.freeze({row: -1, col: 0}),
    down: Object.freeze({row: 1, col: 0}), left: Object.freeze({row: 0, col: -1}),
    right: Object.freeze({row: 0, col: 1})});
  const inBounds = (board, row, col) => Number.isInteger(row) && Number.isInteger(col) &&
    row >= 0 && row < board.rows && col >= 0 && col < board.cols;
  const index = (board, row, col) => inBounds(board, row, col) ? row * board.cols + col : -1;
  const position = (board, value) => Number.isInteger(value) && value >= 0 && value < board.rows * board.cols ?
    {row: Math.floor(value / board.cols), col: value % board.cols} : null;
  const neighbor = (board, tile, direction) => {
    if (!Object.hasOwn(directions, direction)) return null;
    const delta = directions[direction], row = tile.row + delta.row, col = tile.col + delta.col;
    return inBounds(board, row, col) ? {row, col} : null;
  };
  const tileAt = (state, row, col) => state.tiles.find(tile => tile.row === row && tile.col === col) || null;
  const grid = {directions, inBounds, index, position, neighbor, tileAt};
  root.TileSlideV05 = Object.assign(root.TileSlideV05 || {}, {grid});
  if (typeof module !== 'undefined') module.exports = grid;
})(globalThis);
