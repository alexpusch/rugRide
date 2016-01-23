import { Camera } from 'gamebone';

export default class ParallexCamera extends Camera{
  constructor(options){
    super(options);

    this.baseCamera = options.camera;
    this.parallex = options.parallex;

    this.observeOn(this.baseCamera, 'tx', (tx)=>{
      this.tx = tx/this.parallex;
    });
  }
}