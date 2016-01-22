import Obstacle from './obstacle_model';
import ObstacleView from './obstacle_view';

import { Controller, Collection, CollectionView } from 'gamebone';
import * as _ from 'lodash';

import Spawner from '../../components/spawner';

export default class ObstacleController extends Controller{
  constructor(options) {
    super();
    this.game = options.game;
    this.world = options.world;
    this.container = options.container;
  }

  start() {
    let obstacles = new Collection();

    this._spawnObstacles(obstacles);

    this.obstaclesView = this._getView(obstacles);

    this.container.add(this.obstaclesView);
  }

  _getView(obstacles) {
    let view = new CollectionView({
      childViewType: ObstacleView,
      collection: obstacles,
    });

    this.on('destroy', () => {
      view.destroy();
    });

    return view;
  }

  _spawnObstacles(obstacles) {
    let spawner = new Spawner({
      game: this.game,
      spawnInterval: 1000,
      spawnFunction: (x) => {
        let y = _.random(0, this.game.height);
        let height = _.random(this.game.height / 5, this.game.height / 3);
        let width = 40;
        let obstacle = new Obstacle({ x: x + width, y, width, height });
        this.world.add(obstacle);
        obstacles.add(obstacle);

      },
    });

    spawner.start();
  }
}
