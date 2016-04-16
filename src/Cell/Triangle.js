
import Cell from './Cell';

export default class Triangle extends Cell {

  canMoveTo(to){
    let p = this.position;
    return Math.abs(p.x - to.x) === Math.abs(p.y - to.y);
  }

  onFrame() {
    // some custom animation
  }

}
