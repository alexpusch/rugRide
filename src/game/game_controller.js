import { Controller, World } from 'gamebone';

import RugController from './rug/rug_controller';
import ObstacleController from './obstacle/obstacle_controller';
import CoinController from './coins/coins_controller';

import Rug from './rug/rug_model';
import Coin from './coins/coin_model';
import Obstacle from './obstacle/obstacle_model';

module.exports = class GameController extends Controller{
  constructor(options) {
    super();
    this.game = options.game;
  }

  start() {
    let world = this.world = new World({ gravity: [0, 0] });
    let game = this.game;

    this.rugController = new RugController({ game, world });
    this.obstacleController = new ObstacleController({ game, world });
    this.coinController = new CoinController({ game, world });

    this.rugController.start();
    this.obstacleController.start();
    this.coinController.start();

    world.onCollision(Rug, Coin, function(rug, coin) {
      coin.picked();
    });

    world.onCollision(Rug, Obstacle, function(rug, obstacle) {
      game.gotoScreen('gameover');
    });

    let then = performance.now();

    game.frame = (now) => {
      let dt = now - then;
      then = now;
      world.step(1 / 60, dt / 1000);
    };
  }

  destroy() {
    super.destroy();

    this.rugController.destroy();
    this.obstacleController.destroy();
    this.coinController.destroy();
  }
};
