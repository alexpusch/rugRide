import { Base } from 'gamebone';

export default class ViewLooper extends Base{
  constructor(options){
    super(options);
    this.camera = options.camera;
    this.container = options.container;
  }

  start(createInstanceFn){
    let leftInstance = this.leftInstance = createInstanceFn();
    let rightInstance = this.rightInstance = createInstanceFn();
    rightInstance.position.x = leftInstance.position.x + leftInstance.width;

    this.container.addChild(leftInstance);
    this.container.addChild(rightInstance);

    this.observeOn(this.camera, 'tx', this._loop.bind(this));
  }

  _loop(){
    let viewport = this.camera.getBoundingBox();
    let rightInstance = this.rightInstance;
    let leftInstance = this.leftInstance;

    if(rightInstance.position.x + rightInstance.width < viewport.bottomRight.x){
      leftInstance.position.x = rightInstance.position.x;
      rightInstance.position.x = leftInstance.position.x + leftInstance.width - 1;
    }
  }

  destroy(){
    super.destroy();
    this.leftInstance.destroy();
    this.rightInstance.destroy();
  }
}


