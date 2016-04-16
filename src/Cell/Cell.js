
import colorMap from './colorMap';

export default class Cell {

  constructor(options){
    Object.assign(this, options);
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
      strokeColor: this.strokeColor
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

  canMoveTo(/*position*/){
    // return false if is not Implemented
    return false;
  }

  onFrame() {
    //this.rect.rotate(1);
  }

}
