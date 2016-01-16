import { Controller } from 'gamebone';

import Rug from './rug_model';
import RugView from './rug_view';
import FollowCamera from '../../components/follow_camera';

export default class RugController extends Controller{
  constructor(options = {}) {
    super();
    this.game = options.game;
    this.world = options.world;
  }

  start() {
    let rug = new Rug({ x: 0, y: 0 });
    this.world.add(rug);

    let rugView = this.rugView = new RugView({ model: rug });
    this.game.show('main', rugView);
    this._configControls(rug);

    let camera = this.camera = this._setupCamera(rug);
    camera.start(this.game.layout.main);

    this.game.reqres.setHandler('rug:position:x', function() {
      return rug.x;
    });
  }

  destroy() {
    super.destroy();

    this.rugView.destroy();
    this.camera.destroy();
  }

  _setupCamera(rug) {
    let camera = new FollowCamera({
      model: rug,
      targetX: 100,
    });

    this.game.reqres.setHandler('rug:camera:position', () => {
      return {
        x: -camera.tx,
        y: -camera.ty,
        z: camera.zoom,
      };
    });

    this.game.reqres.setHandler('rug:camera', () => { return camera; });
    return camera;
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
