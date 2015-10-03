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

    let camera = this._setupCamera(rug);
    camera.start(this.game.layout.main);
   
    this.game.reqres.setHandler("rug:position:x", function(){
      return rug.x;
    });
  }

  _setupCamera(rug){
    let camera = new FollowCamera({
      model: rug,
      targetX: 100
    })

    this.game.reqres.setHandler("rug:camera:position", () => {
      return {
        x: -camera.tx,
        y: -camera.ty,
        z: camera.zoom
      }
    });

    return camera;
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