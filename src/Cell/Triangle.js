
import Cell from './Cell';

export default class Triangle extends Cell {

  canMoveTo(to){
    let p = this.position;
    return ((this._getSteps(this.position, to, true) > 2 ? false : true)) &&
      Math.abs(p.x - to.x) === Math.abs(p.y - to.y);
  }

  getShape(){
    let pos = this.rect.bounds.center.clone();
    pos.y += 5;
    return {
      center: pos,
      points: 3,
      radius: this.rect.bounds.height / 4,
      color: this.color
    };
  }

  onFrame(e) {
    super.onFrame(e);
    // some custom animation
  }

}
