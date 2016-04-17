import { PropTypes } from 'react';

const LevelStats = (props) => {
  return (
    <div>
      <div className="level-number">Level { props.levelNumber }</div>
      <div className="moves">Moves: { props.moves }</div>
      { props.maxMoves &&
        <div className="max-moves">Max. Moves: { props.maxMoves }</div>
      }
    </div>
  );
};

LevelStats.propTypes = {
  levelNumber: PropTypes.number.isRequired
};

export default LevelStats;
