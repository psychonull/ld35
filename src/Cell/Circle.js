
import Cell from './Cell';

export default class Circle extends Cell {

  canMoveTo(to){
    // can move to any with max of 1
    return this._getSteps(this.position, to, true) > 1 ? false : true;
  }

  getShape(){
    return {
      center: this.rect.bounds.center.clone(),
      points: 10,
      radius: this.rect.bounds.height / 3.5,
      color: this.color
    };
  }


  onFrame(e) {
    super.onFrame(e);
    // some custom animation
  }

}
