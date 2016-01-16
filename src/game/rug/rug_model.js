import {Model} from 'gamebone';
import * as p2 from 'p2/build/p2';

export default class Rug extends Model{
  constructor(options) {
    super(options);
    this.width = 108;
    this.height = 58;

    this.velocity = [1000, 0];
  }

  createBody() {
    let body = new p2.Body({
      mass: 1,
      damping: 0,
    });

    let shape = new p2.Box({
      width: this.width,
      height: this.height,
    });

    body.addShape(shape);

    return body;
  }

  preStep(dt) {
    if (this.movement) {
      let direction = this._getMovmentDirection();
      let force = 5000 * direction;
      this.body.applyForce([0, force]);
    }
  }

  postStep(dt) {
    this.x = this.body.position[0];
    this.y = this.body.position[1];

    this._handleMovementStep();
  }

  goTo(y) {
    this.movement = {
      start: this.y,
      target: y,
    };
  }

  _getMovmentDirection() {
    let delta = this.movement.target - this.movement.start;

    if (delta == 0)
      return 0;

    let direction = delta / Math.abs(delta);

    return direction;
  }

  _handleMovementStep() {
    if (this.movement) {
      if (this._reachedTarget()) {
        this.y = this.movement.target;
        this._stop();
      }
    }
  }

  _stop() {
    this.velocity[1] = 0;
    this.movement = null;
  }

  _reachedTarget() {
    let dir = this._getMovmentDirection();
    return dir * this.y > dir * this.movement.target;
  }
}
