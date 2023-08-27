import { GameMap } from "../gameMap";
import { Monster } from "../mapObject/role/monster";
import { Position } from "../position";
import { ObjectGenerator } from "./objectGenerator";

export class MonsterGenerator extends ObjectGenerator<Monster> {
  constructor(map: GameMap) {
    super(map);
  }
  public generateObject(id: string, position: Position, map: GameMap): Monster {
    return new Monster(id, position, map);
  }
}
