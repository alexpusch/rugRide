export default class Spawner{
  constructor(options){
    this.game = options.game;
    this.zIndex = options.zIndex || 1;
    this.spawnInterval = options.spawnInterval;
    this.spawnFunction = options.spawnFunction;

    this.nextSpawnLocation = this.game.width;
  }

  start(){
    this.game.on("frame", () => {
      let x = this.game.reqres.request("rug:camera:position").x;

      if(x > this.nextSpawnLocation){
        x = this.nextSpawnLocation;
        this.nextSpawnLocation += this.spawnInterval;

        this.spawnFunction.call(this, x + this.game.width);
      }
    });
  }
}