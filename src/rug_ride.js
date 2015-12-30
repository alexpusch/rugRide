import * as PIXI from "pixi.js/bin/pixi.js"

import { Game, World } from "gamebone"

import StartScreenController from "./start_screen/start_screen_controller"

import RugController from "./rug/rug_controller"
import ObstacleController from "./obstacle/obstacle_controller"
import CoinController from "./coins/coins_controller"

import Rug from "./rug/rug_model"
import Coin from "./coins/coin_model"

export default function rugRide(options = {}) {
  PIXI.loader.add([
    "assets/images/rug.png",
    "assets/images/rock.png",
  ]);
  PIXI.loader.once("complete", function(){
    let game = new Game(options);
    let filter = new PIXI.filters.PixelateFilter();
    filter.size = new PIXI.Point(6, 6);
    game.setFilters([filter]);

    let world = new World({gravity: [0,0]});

    world.onCollision(Rug, Coin, function(rug, coin){
      coin.picked();
    })

    let then = performance.now();

    game.frame = (now) => {
      let dt = now - then;
      then = now;
      world.step(1/60, dt / 1000);
    }
    game.start();
    
    let startScreenController = new StartScreenController({game});
    
    game.addScreens({
      start: startScreenController,
      game: {
        start: () => {
          let rugController = new RugController({ game, world });
          let obstacleController = new ObstacleController({ game, world });
          let coinController = new CoinController({game, world});

          rugController.start();
          obstacleController.start();
          coinController.start();
        }
      }
    });

    game.gotoScreen("start");
  });

  PIXI.loader.load();
}
