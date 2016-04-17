
import Grid from './Grid';
import levels from './levels';
import { loadLevel } from './actions/gameStateActions.js';
import { EventEmitter } from 'events';

export default class Game extends EventEmitter {

  constructor(store, options){
    super();
    view.onFrame = e => this.onFrame(e);

    this.level = 0;
    this.store = store;
    this.options = options;
    this.store.subscribe(() => this.onChangeStore());
    this.container = document.getElementById('game-container');
    this.container.addEventListener('click', () => this.onContainerClick());
  }

  start(lvlIdx, options){
    if(lvlIdx === 0 && options){ //hack
      this.emit('game:start');
    }
    this.clear();
    this.level = lvlIdx;
    this.options = Object.assign({}, this.options, options);

    this.grid = new Grid(this.store, levels[lvlIdx], view.bounds,
      () => this.onWinLevel());

    this.store.dispatch(loadLevel(levels[lvlIdx], lvlIdx + 1));

    view.draw();
  }

  startCustomLevel(levelData){
    this.clear();
    this.grid = new Grid(this.store, levelData, view.bounds,
      () => window.alert('Custom level ok!'));
    this.store.dispatch(loadLevel(levelData, 'Custom'));
  }

  clear(){
    project.activeLayer.removeChildren();
  }

  onWinLevel(){
    this.emit('level:win', this.level);
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

  onChangeStore(){
    let newSoundOption = this.store.getState().gameState.sound;
    if(this.options.sound !== newSoundOption ){
      this.emit(newSoundOption ? 'sound:unmute' : 'sound:mute');
      this.options.sound = newSoundOption;
    }
  }

  onContainerClick(){
    if(this.grid.lost){
      this.onRestartLevel();
    }
  }

}
