import { View } from "gamebone"
import * as PIXI from "pixi.js/bin/pixi.js"

export default class MountainView extends View{
  initialize(){
    this.model.observe(["x", "y"] , this.update.bind(this));
  }
  
  render(){
    let mountainGraphics = PIXI.Sprite.fromImage(`assets/images/mountain${this.model.type}.png`);
    mountainGraphics.anchor = new PIXI.Point(0.5,1);

    let ratio = this.model.width / mountainGraphics.width;
    mountainGraphics.scale = new PIXI.Point(ratio, ratio);
    this.container.addChild(mountainGraphics);
  }

  update(){ 
    this.container.position.x = this.model.x/this.model.z
    this.container.position.y = this.model.y
  }

  get zIndex(){
    return this.model.z;
  }
} 
