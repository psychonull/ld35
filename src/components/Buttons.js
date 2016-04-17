import { PropTypes } from 'react';
import levels from '../levels.js';
import LevelSelection from './LevelSelection.js';
import Popup from '../Popup.js';

const showLevelSelection = (game) => {
  let maxLevel = game.store.getState().gameState.maxLevel;
  let currentLevels = levels.map((l, i) => {
    return {
      number: i + 1,
      enabled: i + 1 <= maxLevel
    };
  });
  let popup = new Popup('level-selection');
  popup.show(<LevelSelection levels={currentLevels}
    onLevelSelect={(lvlIdx) => {
      game.start(lvlIdx);
      popup.hide();
    }}
    onCancel={() => popup.hide()}
  />, { timeout: false, skippable: false });
};

const Buttons = (props) => {
  return (
    <div>
      <button onClick={() => props.game.onRestartLevel()}>Restart level</button>
      <button onClick={() => showLevelSelection(props.game)}>Level selection</button>
      <button onClick={() => props.actions.toggleSound()}>
      { props.sound ? 'SOUND OFF' : 'SOUND ON' }
      </button>
      <button>(?)</button>
    </div>
  );
};

Buttons.propTypes = {
  actions: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  sound: PropTypes.bool.isRequired
};

export default Buttons;
