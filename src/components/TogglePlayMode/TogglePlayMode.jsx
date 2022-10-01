import './style.css';

const TogglePlayMode = ({ modes, mode, onClick }) => {
  const handleClick = () => {
    // If current mode === lastMode then back to firstMode
    // Otherwise, increment the mode
    if (mode === modes.length - 1) {
      onClick(0);
    } else {
      onClick(mode + 1);
    }
  };
  return (
    <button className='btn-toggle' onClick={handleClick}>
      <span>{modes[mode].icon}</span>
      <span>{modes[mode].name}</span>
    </button>
  );
};

export default TogglePlayMode;
