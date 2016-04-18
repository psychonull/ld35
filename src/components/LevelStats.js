import { PropTypes } from 'react';

const LevelStats = (props) => {

  let moves = props.moves === -1 ? 0 : props.moves;

  let warning = '';
  if (props.maxMoves){
    warning = props.maxMoves - moves < 3 ? 'warning' : '';
    warning = props.maxMoves - moves < 2 ? 'danger' : warning;
  }

  return (
    <div className="level-stats">
      <div className="level-number">
        Level <span className="value">{ props.levelNumber }</span></div>
      <div className={"moves smaller " + warning}>
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
