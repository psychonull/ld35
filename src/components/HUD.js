import { PropTypes } from 'react';
import LevelStats from './LevelStats.js';
import Buttons from './Buttons.js';

const HUD = (props) => {
  return (
    <div>
      <LevelStats {...props.gameState} />
      <Buttons {...props.gameState} actions={props.actions} />
    </div>
  );
};

HUD.propTypes = {
  actions: PropTypes.object.isRequired,
  gameState: PropTypes.object.isRequired
};

export default HUD;
