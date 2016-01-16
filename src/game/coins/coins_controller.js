import Coin from './coin_model';
import CoinView from './coin_view';
import { Controller, Collection, CollectionView } from 'gamebone';

import Spawner from '../../components/spawner';

export default class CoinController extends Controller{
  constructor(options = {}) {
    super();
    this.game = options.game;
    this.world = options.world;
  }

  start() {
    let coins = new Collection();
    this.world.addCollection(coins);

    let coinsView = this.coinsView = this._getView(coins);

    this.game.show('main', coinsView);

    this._spawnCoins(coins);
  }

  _getView(coins) {
    let view = new CollectionView({
      childViewType: CoinView,
      collection: coins,
    });

    this.on('destroy', () => {
      view.destroy();
    });

    return view;
  }

  _spawnCoins(coins) {
    let spawner = new Spawner({
      game: this.game,
      spawnInterval: 103,
      spawnFunction: (x) => {
        let y = this.game.height / 2 + Math.sin(1 / 8 * x * Math.PI / 180) * 150;
        let coin = new Coin({ x, y });
        coins.add(coin);
      },
    });

    spawner.start();
  }
}
