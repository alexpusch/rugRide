import { View } from 'gamebone'
import * as PIXI from 'pixi.js/bin/pixi.js';

export default class SkyView extends View {
  render(){
    let skyRect = this._getSkyRect();
    this.container.addChild(skyRect);

    let moon = this._getMoon();
    this.container.addChild(moon);
  }

  _getSkyRect(){
    let skyRect = new PIXI.Graphics();
    skyRect.beginFill(0x380505);
    skyRect.drawRect(0, 0, this.options.width, this.options.height);
    skyRect.endFill();

    return skyRect;
  }

  _getMoon(){
    let moon = PIXI.Sprite.fromImage('assets/images/moon.png');
    moon.width /= 2;
    moon.height /= 2;

    moon.anchor.x = 0.5;
    moon.anchor.y = 0.5;

    moon.position.x = this.options.width * 0.75;
    moon.position.y = this.options.height * 0.20;

    return moon;
  }
}
