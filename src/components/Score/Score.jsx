import './style.css';

const ScoreItem = ({ name, score }) => (
  <div className='score-item'>
    <p className='name'>{name}</p>
    <p className='score'>{score}</p>
  </div>
);

const Score = ({ players, scores, tie }) => {
  return (
    <div className='score-container'>
      <ScoreItem name={players[0].name} score={scores[0]} />
      <ScoreItem name='Tie' score={tie} />
      <ScoreItem name={players[1].name} score={scores[1]} />
    </div>
  );
};

export default Score;
