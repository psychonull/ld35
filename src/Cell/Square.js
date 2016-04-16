
import Cell from './Cell';

export default class Square extends Cell {

  canMoveTo(to){
    let p = this.position;
    return (p.x === to.x && p.y !== to.y) ||
      (p.y === to.y && p.x !== to.x);
  }

  onFrame() {
    // some custom animation
  }

}
