// Singletone

class Particles {

  constructor(){
    this.gravityX = [];
    this.gravityY = [];
    this.sparks = [];
    this.alphas = [];
  }

  fire(options){

    let {
      type,
      position,
      radius,
      amount,
      color
    } = options;

    for (let i=0; i < amount; i++) {
      let spark;

      if (type === 'circle'){
        spark = new Path.Circle(new Point(position), radius);
      }
      else {
        spark = new Path.Rectangle(new Point(position), new Size(radius, radius));
      }

			spark.fillColor = color;

			this.sparks.push(spark);

      this.gravityX.push(this.rnd(-2, 2));
			this.gravityY.push(this.rnd(-2, 2));

      this.alphas.push(1);
		}
  }

  rnd(low, high){
		return low + (high-low) * Math.random();
	}

  onFrame(/*e*/) {

    //render and animate particles
		for (let i=0; i < this.sparks.length; i++) {
			let gx = this.gravityX[i];
			let gy = this.gravityY[i];
			let alphaValue= this.alphas[i];
			this.sparks[i].fillColor.alpha = alphaValue;
			this.sparks[i].position.x += gx;
			this.sparks[i].position.y += gy;
		}

		//change opacity of particles
		for (let i=0; i < this.sparks.length; i++) {
			if (this.alphas[i] > 0) {
				let alphaValue = this.alphas[i];
				this.alphas[i] = alphaValue -= .01;
			}
		}

		//remove particles based on age (alpha)
		for (let i=0; i < this.sparks.length; i++) {
			if (this.alphas[i] <= 0) {
				this.sparks.splice(i,1);
				this.gravityX.splice(i,1);
				this.gravityY.splice(i,1);
				this.alphas.splice(i,1);
			}
		}
  }
}

const instance = new Particles();
export default instance;
