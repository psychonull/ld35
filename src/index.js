
import paper from 'paper';
import Grid from './Grid';

paper.install(window);
window.onload = function() {
  paper.setup('game-viewport');

  let grid = new Grid();
  grid.draw(paper, 4, 4, paper.view.bounds);
};
