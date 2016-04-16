
import colorMap from './colorMap';

export default class Cell {

  constructor(options){
    Object.assign(this, options);
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
      strokeColor: (this.target && 'yellow') || (this.current && 'white') || 'black'
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

  onFrame() {

  }

}
