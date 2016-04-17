
import Grid from './Grid';
import levels from './levels';
import { loadLevel } from './actions/gameStateActions.js';

export default class Game {

  constructor(store){
    view.onFrame = e => this.onFrame(e);

    this.level = 0;
    this.store = store;
  }

  start(lvlIdx){
    this.clear();
    this.level = lvlIdx;

    this.grid = new Grid(this.store, levels[lvlIdx], view.bounds,
      () => this.onWinLevel());

    this.store.dispatch(loadLevel(levels[lvlIdx], lvlIdx + 1));

    view.draw();
  }

  clear(){
    project.activeLayer.removeChildren();
  }

  onWinLevel(){
    window.alert("You Win!");
    if(this.level == levels.length -1){
      window.alert("There are no more levels! starting again...");
      window.location.reload();
      return;
    }

    this.start(this.level + 1);
  }

  onRestartLevel(){
    this.start(this.level);
  }

  onFrame(/*e*/) {
    // View Main onFrame

    //console.dir(e);
    //e.delta
    //e.time
    //e.count
  }

}
