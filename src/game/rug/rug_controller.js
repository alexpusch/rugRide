import { Controller } from 'gamebone';

import Rug from './rug_model';
import RugView from './rug_view';

export default class RugController extends Controller{
  constructor(options = {}) {
    super();
    this.game = options.game;
    this.world = options.world;
    this.container = options.container;
  }

  start() {
    let rug = this.rug = new Rug({ x: 0, y: 0 });
    this.world.add(rug);

    let rugView = this.rugView = new RugView({ model: rug });
    this.container.add(rugView);
    this._configControls(rug);
  }

  getRug(){
    return this.rug;
  }

  destroy() {
    super.destroy();

    this.rugView.destroy();
  }

  _configControls(rug) {
    this.game.handleTouch({
      start(event) {
        let touch = event.touches[0], x = touch.gameX, y = touch.gameY;

        rug.goTo(y);
      },

      move(event) {
        let touch = event.touches[0], x = touch.gameX, y = touch.gameY;

        rug.goTo(y);
      },
    });
  }
}
