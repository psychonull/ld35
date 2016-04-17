import { PropTypes } from 'react';

const startAndClose = (props, isHistory) => {
  document.getElementById('container').classList.remove('hidden');
  props.game.start(0, {isHistory});
  props.onClose();
};

const MainMenu = (props) => {
  return (
    <div class="main-menu">
      <h1>LD35: Game</h1>
      <a href="" onClick={(e) => {e.preventDefault(); startAndClose(props, true);}}><h3>History Mode</h3></a>
      <a href="" onClick={(e) => {e.preventDefault(); startAndClose(props, false);}}><h3>Arcade</h3></a>
    </div>
  );
};

MainMenu.propTypes = {
  game: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default MainMenu;
