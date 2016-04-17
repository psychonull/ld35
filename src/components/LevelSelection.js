import { PropTypes } from 'react';

const LevelSelection = (props) => {
  return (
    <div>
      <ul>
        { props.levels.map((level) => {
          let isEnabled = level.enabled;
          return (
            <li key={level.number}>
              { isEnabled ?
                <a onClick={ () => props.onLevelSelect(level.number - 1)}> Level {level.number}</a>
                :
                <span className="disabled">Level {level.number}</span>
              }
            </li>
          );
        })}
      </ul>
      <a onClick={() => props.onCancel()} className="secondary">Cancel</a>
    </div>
  );
};

LevelSelection.propTypes = {
  levels: PropTypes.array.isRequired,
  onLevelSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default LevelSelection;
