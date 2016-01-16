import { Camera } from 'gamebone';

export default class FollowCamera extends Camera{
  constructor(options) {
    super(options);

    this.model = options.model;
    this.targetX = options.targetX;

    this.observeOn(this.model, 'x', this.adjust.bind(this));
  }

  adjust() {
    this.tx = this.targetX - this.model.x;
  }
}
