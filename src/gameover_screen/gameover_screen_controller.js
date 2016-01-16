import { Controller } from 'gamebone';
import GameOverScreenView from './gameover_screen_view';

export default class GameoverScreenController extends Controller{
  constructor(options) {
    super();
    this.game = options.game;
  }

  start() {
    let gameOverScreenView = this.gameOverScreenView = this._getView();

    this.game.show('main', gameOverScreenView);
  }

  _getView() {
    let view = new GameOverScreenView();
    this.on('destroy', () => {
      view.destroy();
    });

    return view;
  }
}
