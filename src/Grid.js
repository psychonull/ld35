import {
  Cell,
  Square,
  Triangle,
  Circle
} from './Cell';
import { addMove } from './actions/gameStateActions.js';

import Shapeshifter from './Shapeshifter';

export default class Grid {

  constructor(store, cfg, bounds, onWin){
    this.store = store;
    this.cfg = cfg;
    this.bounds = bounds;
    this.maxMoves = this.cfg.maxMoves;
    this.onWin = onWin;
    this.lost = false;

    this.cells = [];
    this.current = null;
    this.target = null;

    this._generate();

    this.shape = new Shapeshifter({
      onArrived: cell => this.onShapeArrived(cell)
    });

    this.shape.setCell(this.current);
  }

  _generate(){
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

        if (current || target){
          code = +(code / 100).toString().split('.')[1];
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
          maxMoves: this.maxMoves
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
          cell.setCurrent();
          this.current = cell;
        }
        else if (target){
          cell.setTarget();
          this.target = cell;
        }

        this.cells.push(cell);
      }
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

    this.shape.moveTo(cell);
  }

  onShapeArrived(cell){
    this.current.canMove = false;
    this.current.unsetCurrent();

    if (cell.id === this.target.id){
      this.onWin();
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
    this.cells.forEach((c) => {
      if(c.id !== this.current.id){
        c.hide();
      }
    });
  }

  onFrame(e) {
    if (this.shape){
      this.shape.onFrame(e);
    }
  }

}
