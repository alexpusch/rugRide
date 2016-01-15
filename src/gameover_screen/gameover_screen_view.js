import { View } from "gamebone"
import * as PIXI from "pixi.js/bin/pixi.js"

export default class GameOverScreenView extends View{
  render(){
    let text = new PIXI.Text("Game Over",{
      fill: "white"
    });

    this.container.addChild(text);
  }
} 
