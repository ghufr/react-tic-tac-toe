import { BsX, BsCircle } from 'react-icons/bs';
import './style.css';
import React from 'react';

const renderIcon = (playerId) => {
  const Icons = {
    X: <BsX size={86} />,
    O: <BsCircle size={64} />,
  };
  return Icons[playerId];
};

const Board = ({ boardSize, onClick, disabled, board }) => {
  const width = window.screen.width > 700 ? 600 : window.screen.width;
  const gridStyle = {
    gridTemplateColumns: `repeat(${boardSize}, ${width / boardSize}px)`,
    gridTemplateRows: `repeat(${boardSize}, ${width / boardSize}px`,
  };

  const handleClick = (index) => {
    if (disabled) return;
    onClick(index);
  };
  return (
    <div className='grid' style={gridStyle}>
      {board.map((tile, i) => (
        <div key={i} className='grid-item' onClick={() => handleClick(i)}>
          {tile && tile.player ? renderIcon(tile.player.id) : ''}
        </div>
      ))}
    </div>
  );
};

export default Board;
