import { CollectionView } from "gamebone"

export default class ParallaxCollectionView extends CollectionView{
  initialize(options){
    let camera = options.camera;
    camera.observe(["tx"], (x) => {
      this.childViews.forEach( (childView) => {
        let z = childView.model.z, x = childView.model.x,
          zc = 1, xc = camera.tx;

        childView.container.x =  x + xc / z
      });
    })
  }
}