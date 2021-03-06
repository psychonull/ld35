
import Grid from './Grid';
import levels from './levels';
import { loadLevel } from './actions/gameStateActions.js';
import { EventEmitter } from 'events';
import Particles from './Particles';
import story from './story.js';
import Popup from './Popup.js';
import { register as registerSoundManager } from './sounds/Manager.js';
import winMessage from './winMessage.js';
import ShareLevel from './components/ShareLevel.js';

export default class Game extends EventEmitter {

  constructor(store, options){
    super();
    view.onFrame = e => this.onFrame(e);

    this.level = 0;
    this.store = store;
    this.options = options;
    this.store.subscribe(() => this.onChangeStore());
    this.container = document.getElementById('game-container');
    this.storyPopup = new Popup('popup');
    registerSoundManager(this);
    if(!this.store.getState().gameState.sound){
      this.emit('sound:mute');
    }
  }

  start(lvlIdx, options, isReset){
    if(lvlIdx === 0 && !isReset){
      this.emit('game:start');
    }
    else {
      this.emit('level:start', lvlIdx + 1);
    }

    this.clear();
    this.level = lvlIdx;
    this.options = Object.assign({}, this.options, options);

    if(this.options.isHistory && !isReset){
      this.showStory(lvlIdx + 1).then(() => {
        this.emit('story:out', lvlIdx + 1);
        this.createGridAndDraw(lvlIdx);
      });
    }
    else {
      this.createGridAndDraw(lvlIdx);
    }


  }

  createGridAndDraw(lvlIdx){
    this.store.dispatch(loadLevel(levels[lvlIdx], lvlIdx + 1));

    this.grid = new Grid(this.store, levels[lvlIdx], view.bounds,
      () => this.onWinLevel(), () => this.onRestartLevel());


    view.draw();
  }

  startCustomLevel(levelData){
    this.customLevel = levelData;
    this.clear();
    this.grid = new Grid(this.store, levelData, view.bounds,
      () => this.onWinCustomLevel(), () => this.onRestartLevel());

    this.store.dispatch(loadLevel(levelData, 'Custom'));
  }

  clear(){
    project.activeLayer.removeChildren();
  }

  onWinCustomLevel(){
    this.storyPopup.show(
      <ShareLevel levelData={this.customLevel}
        onClose={() => {this.storyPopup.hide(); this.onRestartLevel();}} />,
      {
        timeout: false,
        skippable: false
      }
    );
  }

  onWinLevel(){
    this.emit('game:goal', this.level);

    if(this.level == levels.length -1){
      this.storyPopup.show(winMessage, {
        timeout: 10000,
        skippable: true
      }).then(()=> window.location.reload());
      return;
    }

    this.start(this.level + 1);
  }

  onRestartLevel(){
    if(this.customLevel){
      this.startCustomLevel(this.customLevel);
    }
    else{
      this.start(this.level, {}, true);
    }
  }

  onFrame(e) {
    // View Main onFrame
    if (this.grid){
      this.grid.onFrame(e);
    }

    Particles.onFrame(e);

    //console.dir(e);
    //e.delta
    //e.time
    //e.count
  }

  onChangeStore(){
    let state = this.store.getState().gameState;
    let newSoundOption = state.sound;
    if(this.options.sound !== newSoundOption ){
      this.emit(newSoundOption ? 'sound:unmute' : 'sound:mute');
      this.options.sound = newSoundOption;
    }

    window.localStorage.setItem('ld35', JSON.stringify({
      sound: state.sound,
      maxLevel: state.maxLevel
    }));
  }

  showStory(levelNumber){
    const DEFAULT_DURATION = 1000;
    let s = story[levelNumber.toString()];
    if(!s){
      return Promise.resolve();
    }
    this.emit('story:in', levelNumber);
    return this.storyPopup.show(s.s, {
      timeout: s.d || DEFAULT_DURATION,
      skippable: true,
      video: s.v
    });
  }

}
