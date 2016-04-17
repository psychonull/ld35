import { PropTypes } from 'react';

const LevelStats = (props) => {
  return (
    <div className="level-stats">
      <div className="level-number">Level <span className="value">{ props.levelNumber }</span></div>
      <div className="moves smaller">Moves: <span className="value">{ props.moves }</span></div>
      { props.maxMoves &&
        <div className="max-moves smaller">Max. Moves: <span className="value">{ props.maxMoves }</span></div>
      }
    </div>
  );
};

LevelStats.propTypes = {
  levelNumber: PropTypes.number.isRequired
};

export default LevelStats;
