import { PropTypes } from 'react';

const startAndClose = (props, isHistory, isContinue) => {
  document.getElementById('container').classList.remove('hidden');
  if(isContinue){
    let maxLevel = props.game.store.getState().gameState.maxLevel;
    props.game.start(maxLevel - 1, {isHistory});
  }
  else {
    props.game.start(0, {isHistory});
  }
  props.onClose();
};

const MainMenu = (props) => {
  let maxLevel = props.game.store.getState().gameState.maxLevel;
  return (
    <div class="main-menu">
      <h1>LD35: Game</h1>
      <a href="" onClick={(e) => {e.preventDefault(); startAndClose(props, true);}}><h3>History Mode</h3></a>
      {
        maxLevel !== 1 &&
        <a href="" onClick={(e) => {e.preventDefault(); startAndClose(props, true, true);}}><h4>Continue</h4></a>
      }
      <a href="" onClick={(e) => {e.preventDefault(); startAndClose(props, false);}}><h3>Arcade</h3></a>
      {
        maxLevel !== 1 &&
        <a href="" onClick={(e) => {e.preventDefault(); startAndClose(props, false, true);}}><h4>Continue</h4></a>
      }
    </div>
  );
};

MainMenu.propTypes = {
  game: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default MainMenu;
