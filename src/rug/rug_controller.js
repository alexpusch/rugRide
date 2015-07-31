import Rug from "./rug_model"
import RugView from "./rug_view"


export default class RugController{
  constructor(options = {}){
    this.game = options.game;
  }

  start(){
    let rug = new Rug({x: 0, y: 0, width: 50, height: 20});
    let rugView = new RugView({model: rug});

    this.game.show(rugView);    
  }
}