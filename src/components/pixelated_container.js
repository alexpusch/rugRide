import { View } from 'gamebone';

export default class PixelatedContainer extends View{
  constructor(options){
    super(options);
    this.backstage = this._createContainer();
  }

  render(){
    let backstageContainer = this._createContainer();
    backstageContainer.addChild(this.backstage);

    let filter = new PIXI.filters.PixelateFilter();
    filter.size = new PIXI.Point(6, 6);

    let renderer = this.options.game.stage._renderer;
    let texture = new PIXI.RenderTexture(renderer, renderer.width, renderer.height);

    let sprite = new PIXI.Sprite(texture);
    sprite.filters = [filter];

    this.listenTo(this.options.game, 'frame', () => {
      texture.render(backstageContainer, undefined, true, true);
    });

    this.container.addChild(sprite);
  }

  getBackstage(){
    return this.backstage;
  }

  add(view){
    view.render();

    this.listenTo(view, 'destroy', () => {
      this.backstage.removeChild(view.container);
    });

    this.backstage.addChild(view.container);
  }

  remove(view){
    this.backstage.removeChild(view.container);
  }
}