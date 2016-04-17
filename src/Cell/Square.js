
import Cell from './Cell';

export default class Square extends Cell {

  canMoveTo(to){
    let p = this.position;
    return (!this.maxMoves || (this._getSteps(this.position, to, true) > this.maxMoves ? false : true)) &&
      ((p.x === to.x && p.y !== to.y) ||
      (p.y === to.y && p.x !== to.x));
  }

  getShape(){
    let sizeW = this.rect.bounds.width / 2;
    let sizeH = this.rect.bounds.height / 2;
    let x = this.rect.bounds.topLeft.x + (sizeW/2);
    let y = this.rect.bounds.topLeft.y + (sizeH/2);

    return {
      center: this.rect.bounds.center.clone(),
      points: 4,
      radius: sizeH/2,
      color: this.color
    };
  }

  onFrame(e) {
    super.onFrame(e);
  }

}
