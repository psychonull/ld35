
import { generate as getId } from 'shortid';
import colorMap from './colorMap';

const defaultStroke = 'black';

export default class Cell {

  constructor(options){
    Object.assign(this, options);
    this.id = getId();

    this.canMove = false;
    this._generate();
  }

  _generate(){
    let lw = 4, lw2 = lw*2, lwh = lw/2;

    this.rect = new Path.Rectangle(
      this.attrs.x + lw2,
      this.attrs.y + lw2,
      this.attrs.w - lw2,
      this.attrs.h - lw2
    );

    let fillColor = colorMap[this.code];

    this.rect.style = {
      fillColor,
      strokeWidth: lwh,
      strokeColor: defaultStroke
    };

    this.rect.onFrame = e => this.onFrame(e);

    this.rect.onMouseEnter = () => {
      if (!this.canMove){
        this.rect.fillColor = 'red';
        return;
      }

      this.rect.fillColor = 'green';
    };

    this.rect.onMouseLeave = () => {
      this.rect.fillColor = fillColor;
    };

    this.rect.onClick = () => {
      if (this.canMove){
        this.onMove();
      }
    };

    //DEBUG
    let text = new PointText(this.rect.bounds.center);
    text.content = this.code;
    text.style = {
      fontFamily: 'Courier New',
      fontWeight: 'bold',
      fontSize: 12,
      fillColor: 'white',
      justification: 'center'
    };

  }

  _getSteps(from, to, max){
    let move =  {
      x: Math.abs(from.x - to.x),
      y: Math.abs(from.y - to.y)
    };

    if (max){
      return Math.max(move.x, move.y);
    }

    return move;
  }

  setCurrent(){
    this.rect.style.strokeColor = 'white';
  }

  unsetCurrent(){
    this.rect.style.strokeColor = defaultStroke;
  }

  setTarget(){
    this.rect.style.strokeColor = 'yellow';
  }

  canMoveTo(/*position*/){
    // return false if is not Implemented
    return false;
  }

  onFrame() {
    //this.rect.rotate(1);
  }

}
