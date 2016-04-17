
import paper from 'paper';
import Game from './Game';

paper.install(window);

window.onload = function() {
  paper.setup('game-viewport');

  let game = new Game();

  // move this into a menu (param is level index)
  game.start(4);
};
