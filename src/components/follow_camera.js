import { Camera } from "gamebone"

export default class FollowCamera extends Camera{
  initialize(options){
    this.model = options.model;
    this.targetX = options.targetX;

    this.model.observe(["x"], this.adjust.bind(this));
  }

  adjust(){
    this.tx = this.targetX - this.model.x;
  }
} 
