
import Cell from './Cell';

export default class Circle extends Cell {

  canMoveTo(to){
    // can move to any with max of 1
    return this._getSteps(this.position, to, true) > 1 ? false : true;
  }

  generateShape(){
    super.generateShape();

    if (this.isTarget){
      return;
    }

    let shape = new Path.RegularPolygon(
      this.rect.bounds.center, 10, this.rect.bounds.width / 3);

    shape.fillColor = this.color;

    this.shape = shape;
    this._group.addChild(shape);
  }

  onFrame(e) {
    super.onFrame(e);
    // some custom animation
  }

}
