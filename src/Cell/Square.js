
import Cell from './Cell';

export default class Square extends Cell {

  canMoveTo(to){
    let p = this.position;
    return (p.x === to.x && p.y !== to.y) ||
      (p.y === to.y && p.x !== to.x);
  }

  generateShape(){
    super.generateShape();

    if (this.isTarget){
      return;
    }

    let size = this.rect.bounds.width / 2;
    let shape = new Path.Rectangle(new Size(size, size));

    shape.bounds.center = this.rect.bounds.center;
    shape.fillColor = this.color;
    shape.rotate(45);

    this.shape = shape;
    this._group.addChild(shape);
  }

  onFrame(e) {
    super.onFrame(e);
  }

}
