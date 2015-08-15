import { Game, World } from "gamebone"

import RugController from "./rug/rug_controller"
import ObstacleController from "./obstacle/obstacle_controller"

export default function rugRide(options = {}) {
  let game = new Game(options);
  let world = new World({gravity: [0,0]});

  let rugController = new RugController({ game, world });
  let obstacleController = new ObstacleController({ game, world });

  rugController.start();
  obstacleController.start();
  
  let then = performance.now();

  game.frame = (now) => {
    let dt = now - then;
    then = now;
    world.step(1/60, dt / 1000);
  }
  game.start();
}
