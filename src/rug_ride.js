import { Game } from "gamebone"

import RugController from "./rug/rug_controller"

export default function rugRide(options = {}) {
  let game = game = new Game(options);

  let rugController = new RugController({ game });
  rugController.start();

  game.frame = (dt) => {}
  game.start();
}
