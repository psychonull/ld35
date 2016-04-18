
import Cell from './Cell';

const mx = 2; // max moves

export default class Square extends Cell {

  canMoveTo(to){
    let p = this.position;
    return (this._getSteps(this.position, to, true) > mx ? false : true) &&
      ((p.x === to.x && p.y !== to.y) ||
      (p.y === to.y && p.x !== to.x));
  }

  getShape(){
    return {
      center: this.rect.bounds.center.clone(),
      points: 4,
      radius: this.rect.bounds.height/4,
      color: this.color
    };
  }

  getMoveMatrix(){
    return {
      color:  this.baseColor,
      matrix: [
        [0, mx,0],
        [mx,-1,mx],
        [0, mx,0]
      ]
    };
  }

  onFrame(e) {
    super.onFrame(e);
  }

}
