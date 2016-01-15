import * as p2 from "p2/build/p2"

import {Model} from "gamebone"

export default class Obstacle extends Model{
  createBody(){
    if(this._body)
      return this._body

    let body = new p2.Body({
      mass: 1,
      type: p2.Body.KINEMATIC
    });

    let shape = new p2.Box({
      width: this.width,
      height: this.height
    })

    body.addShape(shape);

    return body;
  }  

  postStep(dt){
    this.x = this.body.position[0];
    this.y = this.body.position[1];
  }
}