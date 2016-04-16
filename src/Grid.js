import Cell from './Cell';

export default class Grid {

  constructor(cfg, bounds){
    this.cfg = cfg;
    this.bounds = bounds;

    this.cells = [];
    this._generate();
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

        this.cells.push(new Cell({
          attrs: {
            x: ctn.left + i * wCell,
            y: ctn.top + j * hCell,
            w: wCell,
            h: hCell
          },
          code,
          target,
          current
        }));
      }
    }

  }

  onFrame(e) {
    this.cells.forEach( c => c.onFrame(e) );
  }

}
