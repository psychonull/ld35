
import Cell from './Cell';

export default class Circle extends Cell {

  canMoveTo(to){
    return true; // can move to any
  }

  onFrame() {
    // some custom animation
  }

}
