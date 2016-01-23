import * as PIXI from 'pixi.js/bin/pixi.js';

import { Game } from 'gamebone';

import GameController from './game/game_controller.js';
import StartScreenController from './start_screen/start_screen_controller';
import GameoverScreenController from './gameover_screen/gameover_screen_controller.js';

export default function rugRide(options = {}) {
  PIXI.loader.add([
    'assets/images/rug.png',
    'assets/images/rock.png',
    'assets/images/mountain1.png',
    'assets/images/mountain2.png',
    'assets/images/mountain3.png',
    'assets/images/mountain4.png',
    'assets/images/lava.png',
    'assets/images/moon.png'
  ]);

  PIXI.loader.once('complete', function() {
    let game = new Game(options);
    let filter = new PIXI.filters.PixelateFilter();
    filter.size = new PIXI.Point(6, 6);
    game.setFilters([filter]);

    game.addScreens({
      start: new StartScreenController({ game }),
      game: new GameController({ game }),
      gameover: new GameoverScreenController({ game }),
    });

    game.start();
    game.gotoScreen('start');
  });

  PIXI.loader.load();
}
