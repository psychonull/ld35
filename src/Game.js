
import Grid from './Grid';
import levels from './levels';

export default class Game {

  constructor(){
    view.onFrame = e => this.onFrame(e);
  }

  start(lvlIdx){
    this.clear();
    this.grid = new Grid(levels[lvlIdx], view.bounds, lvlIdx, levels);
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
