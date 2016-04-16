import {
  Cell,
  Square,
  Triangle,
  Circle
} from './Cell';

export default class Grid {

  constructor(cfg, bounds){
    this.cfg = cfg;
    this.bounds = bounds;

    this.cells = [];
    this.current = null;
    this.target = null;

    this._generate();

    this.calculateMoves();
  }

  _generate(){
    let w = this.cfg.gridSize[0];
    let h = this.cfg.gridSize[1];
    let ctn = this.bounds;

    // TODO: Improve this calculation
    let wCell = ctn.width / w;
    let hCell = ctn.height / h;

    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        let code = this.cfg.cells[j][i];
        let target = code >= 900 && code <= 999 ? true : false;
        let current = code >= 100 && code <= 199 ? true : false;

        if (current || target){
          code = +(code / 100).toString().split('.')[1];
        }

        let opts = {
          position: { x: j, y: i},
          attrs: {
            x: ctn.left + i * wCell,
            y: ctn.top + j * hCell,
            w: wCell,
            h: hCell
          },
          code,
          strokeColor: (target && 'yellow') || (current && 'white') || 'black'
        };

        let cell;
        switch(code){
          case 1: cell = new Square(opts); break;
          case 2: cell = new Triangle(opts); break;
          case 3: cell = new Circle(opts); break;
          default: cell = new Cell(opts); break;
        }

        if (current){
          this.current = cell;
        }
        else if (target){
          this.target = cell;
        }

        this.cells.push(cell);
      }
    }

  }

  calculateMoves() {
    this.cells.forEach( c => {
      let cPos = this.current.position;
      if (c.position.x === cPos.x && c.position.y === cPos.y){
        c.canMove = false;
        return;
      }

      c.canMove = this.current.canMoveTo(c.position);
    });

  }

}
