
import Cell from './Cell';

export default class Square extends Cell {

  canMoveTo(to){
    let p = this.position;
    return (this._getSteps(this.position, to, true) > 2 ? false : true) &&
      ((p.x === to.x && p.y !== to.y) ||
      (p.y === to.y && p.x !== to.x));
  }

  getShape(){
    return {
      center: this.rect.bounds.center.clone(),
      points: 4,
      radius: this.rect.bounds.height/4,
      color: this.color
    };
  }

  onFrame(e) {
    super.onFrame(e);
  }

}
