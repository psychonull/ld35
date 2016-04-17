
import Cell from './Cell';

export default class Square extends Cell {

  canMoveTo(to){
    let p = this.position;
    return (p.x === to.x && p.y !== to.y) ||
      (p.y === to.y && p.x !== to.x);
  }

  getShape(){
    let size = this.rect.bounds.width / 2;
    let shape = new Path.Rectangle(new Point(0,0), new Size(size, size));

    shape.fillColor = this.color;

    return shape;
  }

  onFrame(e) {
    super.onFrame(e);
  }

}
