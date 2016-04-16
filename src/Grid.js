
import { Path } from 'paper';

export default class Grid {

  draw(paper, w, h, ctn){
    var wRect = ctn.width / w;
    var hRect = ctn.height / h;

    for (var i = 0; i < w; i++) {
      for (var j = 0; j < h; j++) {
        var aRect = new Path.Rectangle(ctn.left + i * wRect, ctn.top + j * hRect, wRect, hRect);
        aRect.strokeColor = 'black';
        aRect.fillColor = 'white';
      }
    }
  }
}
