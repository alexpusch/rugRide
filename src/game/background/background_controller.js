import { Model, Collection, Controller } from 'gamebone';
import MountainView from './views/mountain_view';
import LavaView from './views/lava_view';
import SkyView from './views/sky_view';

import ParallexCamera from '../../components/parallex_camera';


export default class BackgroundController extends Controller{
  constructor(options){
    super(options);
    this.game = options.game;
    this.container = options.container;
    this.camera = options.camera;
  }

  start(){
    let skyView = this.skyView = this._createSkyView();
    this.container.add(skyView);

    let mountains = this._createMounaintCollection();
    let mountainViews = this.mountainViews = this._createMountainsViews(mountains);

    mountainViews.forEach((view) => {
      this.container.add(view);
    });

    let lavaView = this.lavaView = this._createLavaView();
    this.container.add(lavaView);

  }

  _createSkyView(){
    return new SkyView({ width: this.game.width, height: this.game.height });
  }

  _createLavaView(){
    let camera = this._createParalex(1);
    let view = new LavaView({camera});
    camera.start(view);

    return view;
  }

  _createMountainsViews(mountains){
    let views = [];
    for(let mountain of mountains){
      let parallexCamera = this._createParalex(mountain.parallex);
      let view = new MountainView({model: mountain, camera: parallexCamera});
      parallexCamera.start(view);
      views.push(view);
    }

    return views;
  }

  _createParalex(parallex){
    let parallexCamera = new ParallexCamera({
      camera: this.camera,
      parallex: parallex,
      viewportWidth: this.game.width,
      viewportHeight: this.game.height
    });

    return parallexCamera;
  }

  _createMounaintCollection(){
    let collection = new Collection([
      new Model({ id: 4, parallex: 243 }),
      new Model({ id: 3, parallex: 81 }),
      new Model({ id: 2, parallex: 27 }),
      new Model({ id: 1, parallex: 3 }),
    ]);

    return collection;
  }

  destroy(){
    super.destroy();
    this.skyView.destroy();
    this.lavaView.destroy();
    this.mountainViews.forEach((view) => { view.destroy(); });
  }
}