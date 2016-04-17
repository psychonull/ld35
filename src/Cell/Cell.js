
import { generate as getId } from 'shortid';
import colorMap from './colorMap';

const targetColor = '#D4AF37';

export default class Cell {

  constructor(options){
    Object.assign(this, options);
    this.id = getId();
    this.maxMoves = options.maxMoves;

    this.canMove = false;
    this.isActive = false;
    this.isHover = false;

    this.baseColor = colorMap[this.code];
    this.color = new Color(this.baseColor);
    this.baseHUE = this.color.hue;

    this.hidden = false;
    this.hiding = false;
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
    };

    this.rect.scale(0.95);
    this.rect.onFrame = e => this.onFrame(e);

    this._group = new Group();
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

  resetStyle(){
    if (this.isTarget){
      return;
    }

    this.rect.fillColor = 'transparent';
    this.rect.strokeColor.hue = this.baseHUE;
    this._group.scaling = 1;
  }

  getShape(){
    // To override
    return {
      points: 4,
      radius: 1
    };
  }

  getCollisionBounds() {
    return this.rect.bounds.clone().scale(0.25, 0.25);
  }

  getCenter(){
    return this._group.bounds.center;
  }

  setTarget(){
    this.isTarget = true;
    this.rect.strokeColor = targetColor;
    this.rect.fillColor = targetColor;
  }

  canMoveTo(/*position*/){
    // return false if is not Implemented
    return false;
  }

  onFrame(e) {
    let sinus;
    if (this.hidden){
      return;
    }

    if (this.hiding){
      this._group.scaling = this._group.scaling.multiply(0.9);
      if (this._group.scaling.length <= 0.1){
        this.hidden = true;
        this.rect.visible = false;
      }
      return;
    }

    if (this.isActive){
      //sinus = Math.sin(e.time * 2 + 0.5) * 0.05;
      //this._group.scaling = sinus + 0.95;
      //this.rect.strokeWidth = 5;
    }
    else if(this.canMove){
      sinus = Math.sin(e.time * 5 + 0.4) * 0.3;
      this.rect.strokeColor.brightness = sinus + 0.8;
      this._group.scaling = 0.98;
      this.rect.strokeWidth = 6;
    }
    else if (!this.isTarget && !this.active && this.code !== 0){
      // TODO: make it animated
      this.rect.strokeWidth = 5;
      this.rect.strokeColor.brightness = 0.3;
      this._group.scaling = 0.95;
    }

    if (this.isHover && !this.isTarget) {
      this.rect.fillColor = this.color;
      this.rect.fillColor.saturation = 0.8;
      this.rect.fillColor.brightness = 0.2;
    }
  }

  hide(){
    this.hiding = true;
    //this.rect.visible = false;
  }

}
