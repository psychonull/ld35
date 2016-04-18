
import Cell from './Cell';

const mx = 1; // max moves

export default class Circle extends Cell {

  canMoveTo(to){
    // can move to any with max of 1
    return this._getSteps(this.position, to, true) > mx ? false : true;
  }

  getShape(){
    return {
      center: this.rect.bounds.center.clone(),
      points: 10,
      radius: this.rect.bounds.height / 3.5,
      color: this.color
    };
  }

  getMoveMatrix(){
    return {
      color: this.baseColor,
      matrix: [
        [mx,mx,mx],
        [mx,-1,mx],
        [mx,mx,mx]
      ]
    };
  }

  onFrame(e) {
    super.onFrame(e);
    // some custom animation
  }

}
