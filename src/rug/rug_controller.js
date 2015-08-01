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
    this._configControls(rug);
  }

  _configControls(rug){
    this.game.handleTouch({
      move(event){
        let touch = event.touches[0], x = touch.gameX, y = touch.gameY;

        rug.goTo(y);
      }
    })
  }
}