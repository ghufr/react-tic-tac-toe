import { useCallback, useEffect, useState } from 'react';
import { fetchState, storeState } from '../services/localStorageService';
import {
  checkDrawCondition,
  checkWinningCondition,
  randomMove,
} from '../services/ticTacToeService';

// If current turn === lastPlayer then back to firstPlayer
// Otherwise, increment the turn
const nextTurn = (turn, playerCount) => {
  if (turn === playerCount - 1) {
    return 0;
  } else {
    return turn + 1;
  }
};

const incrementScore = (scores, turn, point = 1) => {
  return [
    ...scores.slice(0, turn),
    scores[turn] + point,
    ...scores.slice(turn + 1),
  ];
};

const useGame = ({ boardSize, players }) => {
  const numOfTiles = boardSize ** 2;
  const initialState = {
    board: Array(numOfTiles).fill(null),
    moves: [],
    scores: Array(players.length).fill(0),
    tie: 0,
    turn: 0,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const localState = fetchState('game');
    if (localState) {
      setState(localState);
    }
  }, []);

  const nextMove = (index) => {
    // Check if board[index] out of bound or already exist
    if (index < 0 || index > numOfTiles - 1) return;
    if (state.board.findIndex((tile) => tile && tile.index === index) > -1)
      return;

    const currPlayer = players[state.turn];

    const move = {
      player: currPlayer,
      index: index,
    };

    const newBoard = [
      ...state.board.slice(0, index),
      move,
      ...state.board.slice(index + 1),
    ];

    const newMoves = [...state.moves, move];

    // Check winning condition
    const [isWin, cross] = checkWinningCondition(state, boardSize);

    // Check draw condition
    const isDraw = checkDrawCondition(state);

    const newScore = isWin
      ? incrementScore(state.scores, state.turn, 1)
      : state.scores;

    const newTurn = nextTurn(state.turn, players.length);

    const newState = {
      ...state,
      board: newBoard,
      moves: newMoves,
      turn: newTurn,
      tie: isDraw ? state.tie + 1 : state.tie,
      scores: newScore,
    };

    storeState('game', newState);
    setState(newState);
    if (isWin || isDraw) {
      const interval = setInterval(() => {
        reset();
        clearInterval(interval);
      }, 2000);
    }
  };

  // Check if it's computer turn
  useEffect(() => {
    if (players[state.turn].type === 'computer') {
      nextMove(randomMove(state));
    }
  }, []);

  const reset = () => {
    setState({
      ...state,
      moves: initialState.moves,
      turn: initialState.turn,
      board: initialState.board,
    });
  };

  return {
    ...state,
    nextMove,
    reset,
  };
};

export default useGame;
