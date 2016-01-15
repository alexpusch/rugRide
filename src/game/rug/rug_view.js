import { View } from "gamebone"
import * as PIXI from "pixi.js/bin/pixi.js"

export default class RugView extends View{
  constructor(options){
    super(options);
    this.observeOn(this.model, "x y", this.update.bind(this));
  }

  render(){
    var rugGraphics = PIXI.Sprite.fromImage('assets/images/rug.png');
    rugGraphics.scale.x = this.model.width / rugGraphics.width;
    rugGraphics.scale.y = this.model.height / rugGraphics.height;
    rugGraphics.anchor = new PIXI.Point(0.5,0.5);

    this.container.addChild(rugGraphics);
  }

  update(){
    this.container.position.x = this.model.x
    this.container.position.y = this.model.y
  }
}
