import { Game, World } from "gamebone"

import RugController from "./rug/rug_controller"
import ObstacleController from "./obstacle/obstacle_controller"
import CoinController from "./coins/coins_controller"

import Rug from "./rug/rug_model"
import Coin from "./coins/coin_model"

export default function rugRide(options = {}) {
  let game = new Game(options);
  let world = new World({gravity: [0,0]});

  world.onCollision(Rug, Coin, function(rug, coin){
    coin.picked();
  })

  let rugController = new RugController({ game, world });
  let obstacleController = new ObstacleController({ game, world });
  let coinController = new CoinController({game, world});

  rugController.start();
  obstacleController.start();
  coinController.start();

  let then = performance.now();

  game.frame = (now) => {
    let dt = now - then;
    then = now;
    world.step(1/60, dt / 1000);
  }
  game.start();
}
