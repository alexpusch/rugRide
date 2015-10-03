import Obstacle from "./obstacle_model"
import ObstacleView from "./obstacle_view"

import { Collection, CollectionView } from "gamebone"
import * as _ from "lodash"

import Spawner from "../components/spawner"

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

    this.game.show("main", this.obstaclesView);
  }

  _spawnObstacles(obstacles){
    let spawner = new Spawner({
      game: this.game,
      spawnInterval: 1000,
      spawnFunction: (x) => {
        let y = _.random(0, this.game.height);
        let height = _.random(this.game.height/5, this.game.height/3);
        let width = 40;
        let obstacle = new Obstacle({x: x + width,y, width, height})
        obstacles.add(obstacle);
    
        this.world.add(obstacle);
      }
    });

    spawner.start();
  }
}