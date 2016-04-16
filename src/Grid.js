
export default class Grid {

  constructor(w, h, ctn){
    this.sizeW = w;
    this.sizeH = h;
    this.container = ctn;

    this.cells = [];
    this._generate();
  }

  _generate(){
    let w = this.sizeW;
    let h = this.sizeH;
    let ctn = this.container;

    let wCell = ctn.width / w;
    let hCell = ctn.height / h;

    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {

        var cell = new Path.Rectangle(
          ctn.left + i * wCell,
          ctn.top + j * hCell,
          wCell,
          hCell
        );

        cell.strokeColor = 'black';
        cell.fillColor = 'white';

        this.cells.push(cell);
      }
    }
  }

  onFrame(/*e*/) {
    //console.dir(e);
    //e.delta
    //e.time
    //e.count
  }

}
