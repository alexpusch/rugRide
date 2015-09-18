import Coin from "./coin_model"
import CoinView from "./coin_view"
import { Collection, CollectionView } from "gamebone"

export default class CoinController{
  constructor(options = {}){
    this.game = options.game;
    this.world = options.world;
  }

  start(){
    let coins = new Collection();

    let coinsView = new CollectionView({
      childViewType: CoinView,
      collection: coins
    });
    this.game.show(coinsView);

    this.world.addCollection(coins);

    this._spawnCoins(coins);
  }

  _spawnCoins(coins){
    setTimeout(()=>{
      let curPossition = this.game.reqres.request("rug:position:x");
      let x = curPossition + this.game.width
      let y = this.game.height/2 + Math.sin(1/8 * x * Math.PI/180) * 150;
      let coin = new Coin({x, y});
      coins.add(coin);
      this._spawnCoins(coins);
    }, 200)
  }
}
