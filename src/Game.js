
import Grid from './Grid';
import levels from './levels';

export default class Game {

  constructor(){
    view.onFrame = e => this.onFrame(e);
    this.level = 0;
  }

  start(lvlIdx){
    this.clear();
    this.level = lvlIdx;

    this.grid = new Grid(levels[lvlIdx], view.bounds,
      () => this.onWinLevel());

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

  onFrame(/*e*/) {
    // View Main onFrame

    //console.dir(e);
    //e.delta
    //e.time
    //e.count
  }

}
