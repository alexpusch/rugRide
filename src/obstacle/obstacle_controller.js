import Obstacle from "./obstacle_model"
import ObstacleView from "./obstacle_view"

import { Collection, CollectionView } from "gamebone"
import * as _ from "lodash"

export default class ObstacleController{
  constructor(options){
    this.game = options.game;
    this.world = options.world;
  }

  start(){
    let obstacles = new Collection();

    this._spawnObstacles(obstacles);

    this.obstaclesView = new CollectionView({
      childViewType: ObstacleView,
      collection: obstacles
    });

    this.game.show(this.obstaclesView);
  }

  _spawnObstacles(obstacles){
    setTimeout(()=>{
      let x = this.game.reqres.request("rug:position:x") + this.game.width

      let y = _.random(0, this.game.height);
      let height = _.random(this.game.height/5, this.game.height/3);
      let width = 40;
      let obstacle = new Obstacle({x,y, width, height})
      obstacles.add(obstacle);
      this._spawnObstacles(obstacles);
    }, 1000)
  }
}