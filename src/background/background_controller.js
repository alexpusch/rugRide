import MountainView from "./mountain_view"
import { Model, Collection, Layout } from "gamebone"

import ParallaxCollectionView from "../components/parallax_collection_view"
import Spawner from "../components/spawner"

export default class BackgroundController{
  constructor(options = {}){
    this.game = options.game;
  }

  start(){
    let collection = new Collection();
    let layout = new Layout({
      regions: ['mountain1', 'mountain2', 'mountain3', 'mountain4', 'mountain5']
    })

    let createMountain = (type, z, x) => {
      let mountain = new Model({
        type,
        z,
        x,
        y: this.game.height,
        width: 1000
      });

      collection.add(mountain);
    }

    new Spawner({
      game: this.game,
      spawnInterval: 1000,
      spawnFunction: createMountain.bind(this, 1, 4)
    }).start();

    new Spawner({
      game: this.game,
      spawnInterval: 1000,
      spawnFunction: createMountain.bind(this, 2, 8)
    }).start();

    new Spawner({
      game: this.game,
      spawnInterval: 1000,
      spawnFunction: createMountain.bind(this, 3, 16)
    }).start();

    new Spawner({
      game: this.game,
      spawnInterval: 1000,
      spawnFunction: createMountain.bind(this, 4, 32)
    }).start();

    new Spawner({
      game: this.game,
      spawnInterval: 1000,
      spawnFunction: createMountain.bind(this, 5, 64)
    }).start();

    let camera = this.game.reqres.request("rug:camera");
    
    let view = new ParallaxCollectionView({
      collection, camera,
      childViewType: MountainView
    })

    this.game.show("background", view);
  }
}