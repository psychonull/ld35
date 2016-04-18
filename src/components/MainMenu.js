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

const EDITOR_ENTRY_LEVEL = 7;


const clickLevelEditor = (props) => {
  let maxLevel = props.game.store.getState().gameState.maxLevel;
  if(maxLevel > EDITOR_ENTRY_LEVEL){
    window.location.href = window.location.href.replace('index.html', '') + 'editor.html';
  }
};

const MainMenu = (props) => {
  let maxLevel = props.game.store.getState().gameState.maxLevel;
  let levelEditorMessage = '';
  if(maxLevel <= EDITOR_ENTRY_LEVEL){
    levelEditorMessage = `Beat Level ${EDITOR_ENTRY_LEVEL} to unlock the level editor`;
  }
  return (
    <div class="main-menu">
      <h1 className="title">LD35: Game</h1>
      <div className="options">
        <a href="" onClick={(e) => {e.preventDefault(); startAndClose(props, true);}}><h3>Story Mode</h3></a>
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
        <hr />
        <a href="" onClick={(e) => {e.preventDefault(); clickLevelEditor(props);}}><h3>Level Editor</h3></a>
        {
          levelEditorMessage &&
          <small className="error"> {levelEditorMessage} </small>
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
