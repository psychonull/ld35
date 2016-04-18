
import Cell from './Cell';

const mx = 1; // max moves

export default class Hexagon extends Cell {

  canMoveTo(to){
    let p = this.position;
    return ((this._getSteps(this.position, to, true) > mx ? false : true)) &&
      Math.abs(p.y - to.y) === 0;
  }

  getShape(){
    let pos = this.rect.bounds.center.clone();
    //pos.y += 5;
    return {
      center: pos,
      points: 6,
      radius: this.rect.bounds.height / 3.5,
      color: this.color
    };
  }

  getMoveMatrix(){
    return {
      color: this.baseColor,
      matrix: [
        [0,0,0],
        [mx,-1,mx],
        [0,0,0]
      ]
    };
  }

  onFrame(e) {
    super.onFrame(e);
    // some custom animation
  }

}
