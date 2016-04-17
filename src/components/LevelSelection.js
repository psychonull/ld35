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
                <button onClick={ () => props.onLevelSelect(level.number - 1)}> Level {level.number}</button>
                :
                <span>Level {level.number}</span>
              }
            </li>
          );
        })}
      </ul>
      <button onClick={() => props.onCancel()}>Cancel</button>
    </div>
  );
};

LevelSelection.propTypes = {
  levels: PropTypes.array.isRequired,
  onLevelSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default LevelSelection;
