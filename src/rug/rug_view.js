import { View } from "gamebone"
import * as PIXI from "pixi.js/bin/pixi.js"

export default class ObstacleView extends View{
  initialize(){
    this.model.observe(["x", "y"] , this.update.bind(this));
  }
  
  render(){
    let rugGraphics = new PIXI.Graphics()
    rugGraphics.lineStyle(0);
    rugGraphics.beginFill(0x00ffff, 1);
    rugGraphics.drawRect(0, 0, this.model.width, this.model.height)
    rugGraphics.endFill();

    this.container.addChild(rugGraphics);
  }

  update(){ 
    this.container.position.x = this.model.x
    this.container.position.y = this.model.y
  }
} 
