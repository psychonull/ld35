
export default class Shapeshifter {

  constructor(options){
    this.currentCell = null;
    this.nextCell = null;
    this.destination = null;

    this.onArrived = options.onArrived;
  }

  setCell(cell){
    // set shape for first time (no animations)
    this.currentCell = cell;
    this.setShape(true);

    // Fire event to initialize
    this.onArrived(this.currentCell);
  }

  moveTo(cell){
    this.nextCell = cell;
    this.destination = this.nextCell.getCenter();
  }

  isMoving(){
    return this.destination;
  }

  clearMove(){
    this.currentCell = this.nextCell;
    this.nextCell = null;
    this.destination = null;
  }

  setShape() {
    if (this._group){
      this._group.removeChildren();
      this._group.remove();
    }

    let shape = this.currentCell.getShape();
    this._group = new Group(shape);
    this._group.onFrame = e => this.onFrame(e);
  }

  onFrame(e) {

    if (this.destination){
      let vector = this.destination.subtract(this._group.position);
      this._group.position = this._group.position.add(vector.divide(vector.length * 0.3));
      this._group.rotate(25);

      // animate color
      let from = this._group.children[0].fillColor.convert('rgb');
      let to = this.nextCell.color.convert('rgb');

      this._group.children[0].fillColor =
        ((to.subtract(from)).multiply(e.delta)).add(from);

      if (vector.length < 10) {
        this.clearMove();
        this.setShape();

        this.onArrived(this.currentCell);
      }
    }

  }

}
