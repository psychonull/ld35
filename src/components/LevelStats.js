import { PropTypes } from 'react';

const LevelStats = (props) => {

  let moves = props.moves === -1 ? 0 : props.moves;
  return (
    <div className="level-stats">
      <div className="level-number">
        Level <span className="value">{ props.levelNumber }</span></div>
      <div className="moves smaller">
        <span>Moves</span>
        <span className="value">{ moves }</span>
        { props.maxMoves && <span> of </span> }
        { props.maxMoves &&
          <span className="value">{ props.maxMoves }</span>
        }
      </div>
    </div>
  );
};

LevelStats.propTypes = {
  levelNumber: PropTypes.number.isRequired
};

export default LevelStats;
