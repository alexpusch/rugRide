import {Model} from 'gamebone';
import * as p2 from 'p2/build/p2';

export default class Coin extends Model{
  constructor(options) {
    super(options);
    this.width = 10;
    this.height = 10;
  }

  createBody() {
    let body = new p2.Body({
      mass: 1,
      damping: 0,
      type: p2.Body.KINEMATIC,
    });

    let shape = new p2.Box({
      width: this.width,
      height: this.height,
    });
    shape.sensor = true;
    body.addShape(shape);

    return body;
  }

  picked() {
    this.destroy();
  }

  preStep(dt) {}

  postStep(dt) {
    this.x = this.body.position[0];
    this.y = this.body.position[1];
  }
}
