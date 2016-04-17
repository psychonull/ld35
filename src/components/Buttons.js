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
    <div className="buttons">
      <a className="icon-cw" onClick={() => props.game.onRestartLevel()} title="Restart level"></a>
      <a className="icon-shuffle"
        onClick={() => showLevelSelection(props.game)} title="Select Level"></a>
      <a className={ props.sound ? 'icon-volume-off' : 'icon-volume' }
        onClick={() => props.actions.toggleSound()}
        title={ props.sound ? 'SOUND OFF' : 'SOUND ON' }>
      </a>
      <a className="icon-help-circled" title="Help"></a>
    </div>
  );
};

Buttons.propTypes = {
  actions: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  sound: PropTypes.bool.isRequired
};

export default Buttons;
