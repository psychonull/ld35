import { PropTypes } from 'react';
import LevelStats from './LevelStats.js';
import Buttons from './Buttons.js';
import MoveHelper from './MoveHelper.js';

const HUD = (props) => {
  let currentMove = props.gameState.currentMove;
  let nextMove = props.gameState.nextMove;

  return (
    <div>
      <LevelStats {...props.gameState} />
      <Buttons {...props.gameState} actions={props.actions} game={props.game} />
      <div className="next-move">
      { nextMove.visible ?
        <MoveHelper title="Next" className="next" moveGrid={nextMove} />
      : null }
      </div>
      <div className="current-move">
      { currentMove.visible ?
        <MoveHelper title="Current" className="current" moveGrid={currentMove}/>
        : null }
      </div>
    </div>
  );
};

HUD.propTypes = {
  actions: PropTypes.object.isRequired,
  gameState: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

export default HUD;
