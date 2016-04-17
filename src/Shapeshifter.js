
export default class Shapeshifter {

  constructor(options){
    this._group = new Group();
    this._group.transformContent = false;
    this._group.onFrame = e => this.onFrame(e);

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

  setShape(first) {
    this._group.removeChildren();

    let shape = this.currentCell.getShape();
    shape.position = this._group.position.clone();
    if (first){
      this._group.position = this.currentCell.getCenter();
    }
    this._group.addChild(shape);
  }

  onFrame() {
    if (this.destination){
      let vector = this.destination.subtract(this._group.position);
      this._group.position = this._group.position.add(vector.divide(30));

      if (vector.length < 1) {
        this.clearMove();
        this.setShape();

        this.onArrived(this.currentCell);
      }
    }

  }

}
