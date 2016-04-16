
import Cell from './Cell';

export default class Circle extends Cell {

  canMoveTo(to){
    // can move to any with max of 1
    return this._getSteps(this.position, to, true) > 1 ? false : true;
  }

  onFrame() {
    // some custom animation
  }

}
