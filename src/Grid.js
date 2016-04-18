import {
  Cell,
  Square,
  Triangle,
  Circle
} from './Cell';

import { addMove } from './actions/gameStateActions.js';
import { EventEmitter } from 'events';
import { registerGrid as registerGridSounds } from './sounds/Manager.js';

import Shapeshifter from './Shapeshifter';
import Particles from './Particles';

export default class Grid extends EventEmitter {

  constructor(store, cfg, bounds, onWin){
    super();
    this.store = store;
    this.cfg = cfg;
    this.bounds = bounds;
    this.maxMoves = this.cfg.maxMoves;
    this.onWin = onWin;
    this.lost = false;

    this.cells = [];
    this.current = null;
    this.target = null;
    this.cellsLoaded = 0;

    this._generate();
    registerGridSounds(this);
  }

  _generate(){
    this.cellsLoaded = 0;
    let margin = 50;
    let wMargin = margin/2;

    let w = this.cfg.gridSize[0];
    let h = this.cfg.gridSize[1];
    let ctn = this.bounds;

    let wCell = (ctn.width - margin) / w;
    let hCell = (ctn.height - margin) / h;

    if (wCell !== hCell){
      wMargin += ((wCell - hCell) * w) / 2;
      wCell = hCell;
    }

    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        let code = this.cfg.cells[j][i];
        let target = code >= 900 && code <= 999 ? true : false;
        let current = code >= 100 && code <= 199 ? true : false;

        if (current){
          code = +(code / 100).toString().split('.')[1];
        }
        else if (target){
          code = 1;
        }

        let opts = {
          position: { x: i, y: j},
          attrs: {
            x: (wMargin) + ctn.left + i * wCell,
            y: (margin/2) + ctn.top + j * hCell,
            w: wCell,
            h: hCell
          },
          code,
          maxMoves: this.maxMoves,
          onReady: () => this.checkStart()
        };

        let cell;
        switch(code){
          case 1: cell = new Square(opts); break;
          case 2: cell = new Triangle(opts); break;
          case 3: cell = new Circle(opts); break;
          default: cell = new Cell(opts); break;
        }

        cell.onMove = this.onMoveTo.bind(this, cell);

        if (current){
          this.current = cell;
        }
        else if (target){
          this.target = cell;
        }

        cell.show();
        this.cells.push(cell);
      }
    }
  }

  checkStart() {
    this.cellsLoaded++;
    if (this.cellsLoaded === this.cells.length){
      this.current.setCurrent();
      this.target.setTarget();

      this.shape = new Shapeshifter({
        onArrived: cell => this.onShapeArrived(cell)
      });

      this.shape.setCell(this.current);
    }
  }

  calculateMoves() {
    this.cells.forEach( c => {
      if (c.id === this.current.id || c.code === 0){
        c.canMove = false;
      }
      else {
        c.canMove = this.current.canMoveTo(c.position);
      }
    });
  }

  onMoveTo(cell){
    if (this.shape.isMoving()){
      return;
    }
    this.emit('move:start');
    this.shape.moveTo(cell);
  }

  onShapeArrived(cell){
    this.emit('move:end');
    this.current.canMove = false;
    this.current.unsetCurrent();

    if (cell.id === this.target.id){
      this._onWin();
      return;
    }

    this.current = cell;
    this.current.setCurrent();

    this.calculateMoves();

    this.store.dispatch(addMove());

    if(this.isLevelLost()){
      this.onLevelLost();
    }
  }

  // check if won before calling this
  isLevelLost(){
    if(!this.maxMoves){
      return false;
    }
    let currentMoves = this.store.getState().gameState.moves;
    if( currentMoves === this.maxMoves ){
      return true;
    }
    return false;
  }

  onLevelLost(){
    this.lost = true;
    let last;
    this.cells.forEach((c) => {
      if(c.id !== this.current.id){
        c.hide();
      }
      else {
        last = c;
      }
    });

    setTimeout(() => {
      last.hide();
      setTimeout(() => {
        this.shape.destroy();
      }, 250);
    }, 500);
  }

  _onWin(){
    this.emit('move:target');

    this.shape.win();

    Particles.fire({
      position: this.target.getCenter(),
      radius: 2,
      amount: 100,
      color: '#D4AF37'
    });

    this.cells.forEach(c => c.hide());

    setTimeout(() => {
      this.onWin();
    }, 1000);
  }

  onFrame(e) {
    if (this.shape){
      this.shape.onFrame(e);
    }
  }

}
