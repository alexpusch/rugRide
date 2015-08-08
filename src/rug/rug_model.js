import {Model} from "gamebone"
import * as p2 from "p2/build/p2"
import { mixinP2Physics } from "gamebone"

export default class Rug extends Model{
  initialize(){
    this.width = 100;
    this.height = 30;

    this.velocity = [1000, 0];
  }

  get body(){
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

    this._body = body;

    return body;
  }

  preStep(dt){
    // this.body.applyForce([1,0]);
  }

  postStep(dt){
    this.x = this.body.position[0];
    this.y = this.body.position[1];
  }

  goTo(y){
    // let force = y - this.y;
    this.body.position[1] = y
  }  
}

mixinP2Physics(Rug);