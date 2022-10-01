const checkDiagonal = (board, boardSize) => {
  let cross = [];
  const leftIndex = 0;
  const rightIndex = boardSize - 1;

  // left to right
  let count = 1;
  cross = [leftIndex];
  for (let i = 0; i < boardSize; i++) {
    const curr = leftIndex + i * (boardSize + 1);
    const next = leftIndex + (i + 1) * (boardSize + 1);
    // if next item not equal current item = not win
    cross.push(next);
    if (board[curr] === null || board[curr] !== board[next]) {
      break;
    }
    count += 1;
    if (count === boardSize) {
      return [true, cross];
    }
  }

  // right to left
  count = 1;
  cross = [rightIndex];
  for (let i = 0; i < boardSize; i++) {
    const curr = rightIndex + i * (boardSize - 1);
    const next = rightIndex + (i + 1) * (boardSize - 1);
    // if next item not equal current item = not win
    if (board[curr] === null || board[curr] !== board[next]) {
      break;
    }
    count += 1;
    cross.push(next);
    if (count === boardSize) {
      return [true, cross];
    }
  }

  return [false, cross];
};

const checkVertical = (board, boardSize) => {
  let cross = [];
  for (let i = 0; i < boardSize; i++) {
    let count = 1;
    let tmpCross = [i];
    for (let j = 0; j < boardSize; j++) {
      const curr = i + boardSize * j;
      const next = i + boardSize * (j + 1);
      if (board[curr] === null || board[curr] !== board[next]) {
        break;
      }
      tmpCross.push(next);
      count += 1;
    }
    if (count === boardSize) {
      cross = tmpCross;
      return [true, cross];
    }
  }

  return [false, cross];
};

const checkHorizontal = (board, boardSize) => {
  let cross = [];
  for (let i = 0; i < boardSize; i++) {
    let count = 1;
    let tmpCross = [i];
    for (let j = 0; j < boardSize; j++) {
      const curr = i * boardSize + j;
      const next = i * boardSize + j + 1;
      if (board[curr] === null || board[curr] !== board[next]) {
        break;
      }
      tmpCross.push(next);
      count += 1;
    }

    if (count === boardSize) {
      cross = tmpCross;
      return [true, cross];
    }
  }
  return [false];
};

const checkWinningCondition = (state, boardSize) => {
  const diagonal = checkDiagonal(state.board, boardSize);
  const horizontal = checkHorizontal(state.board, boardSize);
  const vertical = checkVertical(state.board, boardSize);

  if (diagonal[0]) {
    return diagonal;
  }
  if (vertical[0]) {
    return vertical;
  }

  if (horizontal[0]) {
    return horizontal;
  }
  return [false];
};

const checkDrawCondition = (state) => {
  if (state.moves.length === state.board.length) {
    return true;
  }
  return false;
};

const randomMove = (state) => {
  // Random positon;
  const emptyTiles = state.board.filter((tile) => !tile);
  const randomIndex = Math.floor(Math.random() * emptyTiles.length);

  return emptyTiles[randomIndex];
};

export { checkWinningCondition, checkDrawCondition, randomMove };
