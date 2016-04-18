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
      <h1 className="title">LD35: Game</h1>
      <div className="options">
        <a href="" onClick={(e) => {e.preventDefault(); startAndClose(props, true);}}><h3>History Mode</h3></a>
        {
          maxLevel !== 1 &&
          <a href="" onClick={(e) => {e.preventDefault(); startAndClose(props, true, true);}}><h4>Continue</h4></a>
        }
        <hr />
        <a href="" onClick={(e) => {e.preventDefault(); startAndClose(props, false);}}><h3>Arcade</h3></a>
        {
          maxLevel !== 1 &&
          <a href="" onClick={(e) => {e.preventDefault(); startAndClose(props, false, true);}}><h4>Continue</h4></a>
        }
      </div>
      <div className="footer">
        Developed by Psychonull for LD35. <a href="https://github.com/psychonull/ld35" target="_blank">Source code</a>.
      </div>
    </div>
  );
};

MainMenu.propTypes = {
  game: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default MainMenu;
