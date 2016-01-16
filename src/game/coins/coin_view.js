import { View } from 'gamebone';
import * as PIXI from 'pixi.js/bin/pixi.js';

export default class CoinView extends View{
  constructor(options) {
    super(options);
    this.observeOn(this.model, 'x y', this.update.bind(this));
  }

  render() {
    let coinGraphics = new PIXI.Graphics();
    coinGraphics.lineStyle(0);
    coinGraphics.beginFill(0xffff00, 1);
    coinGraphics.drawRect(-this.model.width / 2, -this.model.height / 2, this.model.width, this.model.height);
    coinGraphics.endFill();

    this.container.addChild(coinGraphics);
  }

  update() {
    this.container.position.x = this.model.x;
    this.container.position.y = this.model.y;
  }
}
