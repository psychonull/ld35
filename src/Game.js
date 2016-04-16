
import Grid from './Grid';

export default class Game {

  constructor(){
    this.grid = new Grid(4, 4, view.bounds);
  }

  onFrame(e) {
    //console.dir(e);
    //e.delta
    //e.time
    //e.count
    this.grid.onFrame(e);
  }

}
