
import Particles from './Particles';

const handleLenRate = 2.4;

export default class Shapeshifter {

  constructor(options){
    this.onArrived = options.onArrived;
    this.connections = new Group();

    this.currentCell = null;
    this.nextCell = null;
    this.state = null;

    this.circlePaths = [];
    this.destination = null;
    this.current = null;
    this.baseScaling = null;
    this.baseCenter = null;
    this.baseRadius = null;
    this.circleMove = null;
    this.radius = 20;

    this.color;
  }

  setCell(cell){
    // set shape for first time (no animations)
    this.currentCell = cell;
    this.setShape();

    // Fire event to initialize
    this.onArrived(this.currentCell);
    this.state = 'idle';
  }

  moveTo(cell){
    this.nextCell = cell;

    // Start animation
    this.destination = this.nextCell.getCenter();
    this.state = 'scale-down';
  }

  isMoving(){
    return this.destination;
  }

  clearMove(){
    this.currentCell = this.nextCell;
    this.nextCell = null;
    this.destination = null;
  }

  setShape() {
    let shape = this.currentCell.getShape();
    this.radius = shape.radius;
    this.color = shape.color;
    this.createShape(shape);
  }

  createShape(shape) {
    this.current = new Path.RegularPolygon(shape.center, shape.points, shape.radius);
    this.current.style = {
      fillColor: shape.color,
      shadowColor: shape.color.clone(),
      shadowBlur: shape.radius
    };
    this.baseCenter = shape.center;
    this.baseRadius = shape.radius;
    this.baseScaling = this.current.scaling.clone();
  }

  destroy() {
    this.state = 'destroy';
  }

  win(){
    this.state = null;

    if (this.current){
      this.current.visible = false;
    }
  }

  onFrame(e) {
    let scaleRate = e.delta*10;
    let scaleSize = 4;

    if (!this.state){
      return;
    }

    switch(this.state){

      case 'idle': {
        let sinus = Math.sin(e.time * 2 + 0.5) * 0.05;

        const rnd = () => Math.min(Math.max(Math.random(), 0.85), 0.95);
        this.current.scaling = new Point(sinus + rnd(), sinus + rnd());

        sinus = Math.sin(e.time * 3 + 0.4) * 0.3;
        this.current.fillColor.brightness = sinus + 0.8;
        break;
      }

      case 'destroy': {
        Particles.fire({
          position: this.current.bounds.center,
          radius: this.radius / 5,
          amount: 30,
          color: this.color
        });
        this.current.visible = false;
        this.state = null;
        break;
      }

      case 'scale-down': {
        this.current.scaling = this.current.scaling.subtract(scaleRate);
        if (this.current.scaling.length < this.baseScaling.length/scaleSize){
          this.current.scaling = this.baseScaling.clone().divide(scaleSize);
          this.state = 'to-circle';
        }
        break;
      }

      case 'to-circle': {
        let c = new Path.Circle(this.baseCenter, this.baseRadius / scaleSize);
        //c.fillColor = this.color;
        c.style = {
          fillColor: this.color,
          shadowColor: this.color.clone(),
          shadowBlur: this.baseRadius / scaleSize
        };
        c.scaling = this.baseScaling.clone();
        this.current.replaceWith(c);
        this.current = c;
        this.state = 'scale-up';

        Particles.fire({
          type: 'circle',
          position: this.current.bounds.center,
          radius: 1,
          amount: 4,
          color: this.color
        });
        break;
      }

      case 'scale-up': {
        this.current.scaling = this.current.scaling.add(scaleRate*2);
        if (this.current.scaling.length > this.baseScaling.length*scaleSize){
          this.current.scaling = this.baseScaling.multiply(scaleSize).clone();
          this.state = 'to-shape';
        }
        break;
      }

      case 'to-shape': {
        this.circleMove = new Path.Circle(this.current.bounds.center, this.baseRadius/2);
        //this.circleMove.fillColor = this.color;
        this.circleMove.style = {
          fillColor: this.color,
          shadowColor: this.color.clone(),
          shadowBlur: this.baseRadius/2
        };
        this.state = 'move-to-destination';
        break;
      }

      case 'move-to-destination': {
        let vector = this.destination.subtract(this.circleMove.position);
        this.circleMove.position = this.circleMove.position.add(
          vector.divide(vector.length * 0.1)
        );

        if (this.circleMove.scaling.length > this.baseScaling.length){
          this.circleMove.scaling = this.circleMove.scaling.add(scaleRate/5);
        }

        let conns = false;
        if (this.current.scaling.x > 0 && this.current.scaling.y > 0){
          this.current.scaling = this.current.scaling.subtract(scaleRate);
          conns = true;
        }
        else {
          this.current.visible = false;
          this.connections.children = [];
        }

        if (conns){
          this.circlePaths = [];
          this.circlePaths.push(this.current);
          this.circlePaths.push(this.circleMove);
          this.generateConnections(this.circlePaths);
        }

        let isInBox = this.circleMove.position.isInside(
          this.nextCell.getCollisionBounds());

        if (isInBox){
          this.current.remove();
          this.current = null;
          this.connections.children = [];
          this.state = 'scale-down-2';
        }
        break;
      }

      case 'scale-down-2': {
        this.circleMove.scaling = this.circleMove.scaling.subtract(scaleRate);
        if (this.circleMove.scaling.length < this.baseScaling.length/scaleSize){
          this.circleMove.scaling = this.baseScaling.clone().divide(scaleSize);
          this.state = 'to-shape-2';
        }
        break;
      }

      case 'to-shape-2': {
        this.clearMove();
        this.setShape();

        this.current.scaling = this.baseScaling.clone().divide(scaleSize);
        this.circleMove.remove();
        this.state = 'scale-up-2';
        break;
      }

      case 'scale-up-2': {
        this.current.scaling = this.current.scaling.add(scaleRate);
        if (this.current.scaling.length > this.baseScaling.length*(scaleSize/3)){
          this.current.scaling = this.baseScaling.clone();

          Particles.fire({
            type: 'circle',
            position: this.current.bounds.center,
            radius: 1,
            amount: 4,
            color: this.color
          });

          this.onArrived(this.currentCell);
          this.state = 'idle';
        }
        break;
      }
    }
/*
  // Leaving it here for future use (maybe)
  // animate color
  let from = this._group.children[0].fillColor.convert('rgb');
  let to = this.nextCell.color.convert('rgb');

  this._group.children[0].fillColor =
    ((to.subtract(from)).multiply(e.delta)).add(from);

*/
  }

  generateConnections(paths) {
    // Remove the last connection paths:
    this.connections.children = [];

    for (var i = 0, l = paths.length; i < l; i++) {
      for (var j = i - 1; j >= 0; j--) {
        var path = this.metaball(paths[i], paths[j], 0.5, handleLenRate, 3000);
        if (path) {
          this.connections.appendTop(path);
          path.removeOnMove();
        }
      }
    }
  }

  metaball(ball1, ball2, v, handleLenRate, maxDistance) {
    var center1 = ball1.position;
    var center2 = ball2.position;
    var radius1 = ball1.bounds.width / 2;
    var radius2 = ball2.bounds.width / 2;
    var pi2 = Math.PI / 2;
    var d = center1.getDistance(center2);
    var u1, u2;

    if (radius1 === 0 || radius2 === 0){
      return;
    }

    if (d > maxDistance || d <= Math.abs(radius1 - radius2)) {
      return;
    } else if (d < radius1 + radius2) { // case circles are overlapping
      u1 = Math.acos((radius1 * radius1 + d * d - radius2 * radius2) /
          (2 * radius1 * d));
      u2 = Math.acos((radius2 * radius2 + d * d - radius1 * radius1) /
          (2 * radius2 * d));
    } else {
      u1 = 0;
      u2 = 0;
    }

    var angle1 = (center2.subtract(center1)).getAngleInRadians();
    var angle2 = Math.acos((radius1 - radius2) / d);
    var angle1a = angle1 + u1 + (angle2 - u1) * v;
    var angle1b = angle1 - u1 - (angle2 - u1) * v;
    var angle2a = angle1 + Math.PI - u2 - (Math.PI - u2 - angle2) * v;
    var angle2b = angle1 - Math.PI + u2 + (Math.PI - u2 - angle2) * v;
    var p1a = center1.add(this.getVector(angle1a, radius1));
    var p1b = center1.add(this.getVector(angle1b, radius1));
    var p2a = center2.add(this.getVector(angle2a, radius2));
    var p2b = center2.add(this.getVector(angle2b, radius2));

    // define handle length by the distance between
    // both ends of the curve to draw
    var totalRadius = (radius1 + radius2);
    var d2 = Math.min(v * handleLenRate, (p1a.subtract(p2a)).length / totalRadius);

    // case circles are overlapping:
    d2 *= Math.min(1, d * 2 / (radius1 + radius2));

    radius1 *= d2;
    radius2 *= d2;

    var path = new Path({
      segments: [p1a, p2a, p2b, p1b],
      style: ball1.style,
      closed: true
    });
    var segments = path.segments;
    segments[0].handleOut = this.getVector(angle1a - pi2, radius1);
    segments[1].handleIn = this.getVector(angle2a + pi2, radius2);
    segments[2].handleOut = this.getVector(angle2b - pi2, radius2);
    segments[3].handleIn = this.getVector(angle1b + pi2, radius1);
    return path;
  }

  getVector(radians, length) {
    return new Point({
      // Convert radians to degrees:
      angle: radians * 180 / Math.PI,
      length: length
    });
  }

}
