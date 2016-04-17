import {
  Cell,
  Square,
  Triangle,
  Circle
} from './Cell';

import Shapeshifter from './Shapeshifter';

export default class Grid {

  constructor(cfg, bounds, onFrame){
    this.cfg = cfg;
    this.bounds = bounds;

    this.cells = [];
    this.current = null;
    this.target = null;

    this._generate();

    this.shape = new Shapeshifter({
      onArrived: cell => this.onShapeArrived(cell),
      onFrame
    });

    this.shape.setCell(this.current);
  }

  _generate(){
    let margin = 50;

    let w = this.cfg.gridSize[0];
    let h = this.cfg.gridSize[1];
    let ctn = this.bounds;

    // TODO: Improve this calculation
    let wCell = (ctn.width - margin) / w;
    let hCell = (ctn.height - margin) / h;

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
            x: (margin/2) + ctn.left + i * wCell,
            y: (margin/2) + ctn.top + j * hCell,
            w: wCell,
            h: hCell
          },
          code
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
      
      c.updateDisbled();
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
      window.alert("You Win!");
      window.location.reload();
    }

    this.current = cell;
    this.current.setCurrent();

    this.calculateMoves();
  }

}
