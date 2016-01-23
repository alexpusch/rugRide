import { View } from 'gamebone';
import ViewLooper from '../../../components/view_looper';
import * as PIXI from 'pixi.js/bin/pixi.js';

export default class MountainView extends View{
  constructor(options){
    super(options);
  }

  render() {
    let camera = this.options.camera;
    let looper = this.looper = new ViewLooper({
      container: this.container,
      camera: camera,
    });

    looper.start(()=>{
      let instance = PIXI.Sprite.fromImage(`assets/images/mountain${this.model.id}.png`);
      instance.width /= 2;
      instance.height /= 2;
      instance.position.y = camera.getBoundingBox().bottomRight.y - instance.height/2 - 100 - 50 * this.model.id;
      return instance;
    });
  }
}