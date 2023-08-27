import { GameMap } from "../gameMap";
import { Position } from "../position";
import { ObjectGenerator } from "./objectGenerator";
import { Obstacle } from "../mapObject/obstacle";

export class ObstacleGenerator extends ObjectGenerator<Obstacle> {
  constructor(map: GameMap) {
    super(map);
  }
  public generateObject(id: string, position: Position): Obstacle {
    return new Obstacle(id, position);
  }
}
