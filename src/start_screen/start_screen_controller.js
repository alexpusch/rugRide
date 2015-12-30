import StartScreenView from "./start_screen_view"

export default class StartScreenController{
  constructor(options){
    this.game = options.game
  }

  start(){
    let startScreenView = this.startScreenView = new StartScreenView();

    startScreenView.on("start:click", () => {
      this.game.gotoScreen("game");  
    });

    this.game.show("main", startScreenView);
  }

  destroy(){
    this.startScreenView.destroy();
  }
}