
import Cell from './Cell';

export default class Triangle extends Cell {

  canMoveTo(to){
    let p = this.position;
    return Math.abs(p.x - to.x) === Math.abs(p.y - to.y);
  }

  getShape(){
    let shape = new Path.RegularPolygon(
      new Point(0,0), 3, this.rect.bounds.width / 3);

    shape.fillColor = this.color;

    return shape;
  }

  onFrame(e) {
    super.onFrame(e);
    // some custom animation
  }

}
