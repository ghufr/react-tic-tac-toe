import { useEffect, useState } from 'react';
import { FaUser, FaUsers } from 'react-icons/fa';
import { fetchState } from '../services/localStorageService';

// const createPlayer = ({ name, icon, type }) =>

const players = [
  {
    name: 'PLAYER (X)',
    id: 'X',
    type: 'human',
  },
  {
    name: 'PLAYER (O)',
    id: 'O',
    type: 'human',
  },
  {
    name: 'COMPUTER (O)',
    id: 'O',
    type: 'computer',
  },
];

// 1P with computer, 2P with human
const playModes = [
  {
    name: '1P',
    icon: FaUser,
    players: [players[0], players[2]],
  },
  {
    name: '2P',
    icon: FaUsers,
    players: [players[0], players[1]],
  },
];

const usePlayer = () => {
  const initialState = {
    mode: 0,
    players: playModes[0].players,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    // Fetch Player
    const localPlayer = fetchState('player');
    if (localPlayer) {
      setState(localPlayer);
    }
  }, []);

  const setMode = (mode) =>
    setState({ mode, players: playModes[mode].players });

  return {
    ...state,
    modes: playModes,
    setMode,
  };
};

export default usePlayer;
