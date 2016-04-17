
import Cell from './Cell';

export default class Circle extends Cell {

  canMoveTo(to){
    // can move to any with max of 1
    return this._getSteps(this.position, to, true) > 1 ? false : true;
  }

  getShape(){
    let shape = new Path.RegularPolygon(
      this.rect.bounds.center.clone(), 10, this.rect.bounds.height / 3.5);

    shape.fillColor = this.color;

    return shape;
  }


  onFrame(e) {
    super.onFrame(e);
    // some custom animation
  }

}
