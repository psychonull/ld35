
import Grid from './Grid';
import levels from './levels';

export default class Game {

  constructor(store){
    view.onFrame = e => this.onFrame(e);
    this.store = store;
  }

  start(lvlIdx){
    this.clear();
    this.grid = new Grid(this.store, view.bounds, lvlIdx, levels);
    view.draw();
  }

  clear(){
    project.activeLayer.removeChildren();
  }

  onFrame(/*e*/) {
    // View Main onFrame

    //console.dir(e);
    //e.delta
    //e.time
    //e.count
  }

}
