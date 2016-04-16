
import paper from 'paper';
import Game from './Game';

paper.install(window);

window.onload = function() {
  paper.setup('game-viewport');

  let game = new Game();

  view.onFrame = e => {
    game.onFrame(e);
	};

  view.draw();
};
