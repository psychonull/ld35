
import { generate as getId } from 'shortid';
import colorMap from './colorMap';

const targetColor = '#D4AF37';
const disabledColor = '#808080';

export default class Cell {

  constructor(options){
    Object.assign(this, options);
    this.id = getId();

    this.canMove = false;
    this.isActive = false;
    this.isHover = false;

    this.baseColor = colorMap[this.code];
    this.color = new Color(this.baseColor);
    this.baseHUE = this.color.hue;

    this._generate();
  }

  _generate(){
    let path = new Path.Rectangle(
      this.attrs.x,
      this.attrs.y,
      this.attrs.w,
      this.attrs.h
    );

    this.rect = new Path.RoundRectangle(path.bounds, 10);

    this.rect.style = {
      fillColor: 'transparent',
      strokeColor: this.color,
      strokeWidth: 5
      //shadowColor: colorMap[this.code],
      //shadowBlur: 6,
      //shadowOffset: new Point(0, 0)
    };

    this.rect.scale(0.95);

    this.rect.onFrame = e => this.onFrame(e);

/*
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
*/

    this._group = new Group();
    this._group.transformContent = false;
    this._group.addChild(this.rect);

    this._group.onMouseEnter = () => {
      if (this.canMove){
        this.isHover = true;
      }
    };

    this._group.onMouseLeave = () => {
      if (this.canMove){
        this.isHover = false;
        this.resetStyle();
      }
    };

    this._group.onClick = () => {
      if (this.canMove){
        this.onMove();
      }
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
    this.isActive = true;

    if (this.isTarget){
      return;
    }

    this.resetStyle();
  }

  unsetCurrent(){
    this.isActive = false;
    this.isHover = false;
    this.resetStyle();
  }

  updateDisbled(){
    if (this.canMove && !this.isTarget){
      this.rect.strokeColor = this.color;
    }
    else if (!this.isTarget && !this.isActive && this.code !== 0) {
      this.rect.strokeColor = disabledColor;
    }
  }

  resetStyle(){
    if (this.isTarget){
      return;
    }

    this.rect.fillColor = 'transparent';
    this.rect.strokeColor.hue = this.baseHUE;
    this._group.scaling = 1;
  }

  getCenter(){
    return this._group.bounds.center;
  }

  setTarget(){
    this.isTarget = true;
    this.rect.strokeColor = targetColor;
    this.rect.fillColor = targetColor;
  }

  getShape(){
    // Draw nothing if is not overrided
  }

  canMoveTo(/*position*/){
    // return false if is not Implemented
    return false;
  }

  onFrame(e) {
    if (this.isActive || this.isTarget){
      let sinus = Math.sin(e.time * 2 + 0.5) * 0.05;
      this._group.scaling = sinus + 0.95;
    }
    else if (this.isHover) {
      // TODO animate on hover
      //this.rect.strokeColor.hue += 3;
    }
  }

}
