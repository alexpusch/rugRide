import { Controller } from "gamebone";
import StartScreenView from "./start_screen_view"

export default class StartScreenController extends Controller{
  constructor(options){
    super();
    this.game = options.game;
  }

  start(){
    let startScreenView = this.startScreenView = this._getView();

    this.listenTo(startScreenView, "start:click", () => {
      this.game.gotoScreen("game");
    });

    this.game.show("main", startScreenView);
  }

  _getView(){
    let view = new StartScreenView();

    this.on("destroy", () => {
      setTimeout(view.destroy.bind(view), 0);
    });

    return view;
  }
}