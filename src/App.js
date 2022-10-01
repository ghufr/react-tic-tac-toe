import './App.css';
import Board from './components/Board';
import Score from './components/Score';

import useGame from './hooks/useGame';
import usePlayer from './hooks/usePlayer';
import TogglePlayMode from './components/TogglePlayMode';

const boardSize = 3;

function App() {
  // Hooks to create player list
  const { players, mode, modes, setMode } = usePlayer();
  const { board, scores, tie, nextMove } = useGame({
    players,
    boardSize,
  });
  return (
    <div className='container'>
      <Board board={board} boardSize={boardSize} onClick={nextMove} />
      <Score players={players} scores={scores} tie={tie} />
      <TogglePlayMode modes={modes} mode={mode} onClick={setMode} />
    </div>
  );
}

export default App;
