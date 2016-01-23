import { Controller, World } from 'gamebone';

import RugController from './rug/rug_controller';
import ObstacleController from './obstacle/obstacle_controller';
import CoinController from './coins/coins_controller';
import BackgroundController from './background/background_controller';
import PixelatedContainer from '../components/pixelated_container';
import FollowCamera from '../components/follow_camera';

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

    let container = new PixelatedContainer({game});
    let backgroundContainer = new PixelatedContainer({game});
    game.show('main', container);
    game.show('background', backgroundContainer);

    this.rugController = new RugController({ game, world, container });
    this.obstacleController = new ObstacleController({ game, world, container });
    this.coinController = new CoinController({ game, world, container });

    this.rugController.start();
    this.obstacleController.start();
    this.coinController.start();


    this.camera = this._setupCamera(this.rugController.getRug());
    this.camera.start(container.getBackstage());

    this.backgroundController = new BackgroundController({
      game,
      container: backgroundContainer,
      camera: this.camera,
    });

    this.backgroundController.start();

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
    this.backgroundController.destroy();
    this.camera.destroy();
  }

  _setupCamera(rug) {
    let camera = new FollowCamera({
      model: rug,
      targetX: 100,
      viewportWidth: this.game.width,
      viewportHeight: this.game.height
    });

    this.game.reqres.setHandler('rug:camera:position', () => {
      return {
        x: -camera.tx,
        y: -camera.ty,
        z: camera.zoom,
      };
    });

    this.game.reqres.setHandler('camera', () => { return camera; });

    return camera;
  }
};
