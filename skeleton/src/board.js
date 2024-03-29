// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {

  let grid = new Array(8);

  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(8);
  }

  grid[3][4] = new Piece('black');
  grid[4][3] = new Piece('black');

  grid[3][3] = new Piece('white');
  grid[4][4] = new Piece('white');

  return grid;

}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {

  const r = pos[0]
  const c = pos[1]

  if (r < 0 || r >= 8 || c < 0 || c >= 8) {
    return false;
  }
  return true;

};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  const r = pos[0]
  const c = pos[1]
  if (this.isValidPos(pos)) {
    return this.grid[r][c];
  }
  else {
    throw new Error('Not valid pos!');
  }
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (this.getPiece(pos)) {
    return (this.getPiece(pos).color === color);
  }

  return false;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  const r = pos[0];
  const c = pos[1];

  return this.grid[r][c] instanceof Piece;
  // return !!this.grid[r][c]
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip=[]) {
  if (!this.isValidPos(pos)) { // checks if its edge
    return piecesToFlip
  }
  // debugger
  let newPos = [pos[0] + dir[0], pos[1] + dir[1]];
  return this._positionsToFlipTwo(newPos, color, dir, piecesToFlip);
};

Board.prototype._positionsToFlipTwo = function(pos, color, dir, piecesToFlip=[]) {
  if (!this.isValidPos(pos)) { // checks if its edge
    return piecesToFlip
  } else if (!this.isOccupied(pos)) { // checks if empty space
    return piecesToFlip
  } else {
    if (this.isMine(pos, color)) { // checks if our piece
      return piecesToFlip
    } else {
      piecesToFlip.push(pos); // pushes enemy pieces
    }
  }

  let newPos = [pos[0] + dir[0], pos[1] + dir[1]];
  piecesToFlip = piecesToFlip.concat(this._positionsToFlipTwo(newPos, color, dir)); 

  return piecesToFlip;
}

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)){
    return false;
  }

  let count = 0;
  // debugger
  for(let i = 0; i < Board.DIRS.length; i++) {
    if (this._positionsToFlipTwo(pos, color, Board.DIRS[i]).length > 1) {
      count++;
    }
  }
  

  if(this.isValidPos(pos) && count > 0) {
    return true;
  }

  return false;
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};


// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE