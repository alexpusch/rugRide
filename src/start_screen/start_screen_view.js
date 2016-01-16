import { View } from 'gamebone';
import * as PIXI from 'pixi.js/bin/pixi.js';

export default class StartScreenView extends View{
  render() {
    let text = new PIXI.Text('start', {
      fill: 'white',
    });

    text.interactive = true;
    text.buttonMode = true;
    text.on('mousedown', this.trigger.bind(this, 'start:click'))
        .on('touchend', this.trigger.bind(this, 'start:click'));

    this.container.addChild(text);
  }
}
