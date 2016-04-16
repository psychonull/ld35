
import Cell from './Cell';

export default class Circle extends Cell {

  canMoveTo(to){
    return false;
  }

  onFrame() {
    // some custom animation
  }

}
