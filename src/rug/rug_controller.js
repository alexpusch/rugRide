import Rug from "./rug_model"
import RugView from "./rug_view"
import FollowCamera from "./rug_camera"

export default class RugController{
  constructor(options = {}){
    this.game = options.game;
    this.world = options.world;
  }

  start(){
    let rug = new Rug({x: 0, y: 0});
    let rugView = new RugView({model: rug});
    this.world.add(rug);
    this.game.show("main", rugView);
    this._configControls(rug);

    let camera = new FollowCamera({
      model: rug,
      targetX: 100
    })

    this.game.camera = camera;

    this.game.reqres.setHandler("rug:position:x", function(){
      return rug.x;
    });
  }

  _configControls(rug){
    this.game.handleTouch({
      start(event){
        let touch = event.touches[0], x = touch.gameX, y = touch.gameY;

        rug.goTo(y);
      },
      move(event){
        let touch = event.touches[0], x = touch.gameX, y = touch.gameY;

        rug.goTo(y);
      }
    })
  }
}