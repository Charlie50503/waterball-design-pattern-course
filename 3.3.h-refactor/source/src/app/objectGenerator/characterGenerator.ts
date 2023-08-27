import { Character } from "../mapObject/role/character/character";
import { GameMap } from "../gameMap";
import { Position } from "../position";
import { ObjectGenerator } from "./objectGenerator";
import { AttackUpHandler } from "../mapObject/role/character/attackStrategy/attackUpHandler";
import { AttackDownHandler } from "../mapObject/role/character/attackStrategy/attackDownHandler";
import { AttackRightHandler } from "../mapObject/role/character/attackStrategy/attackRightHandler";
import { AttackLeftHandler } from "../mapObject/role/character/attackStrategy/attackLeftHandler";

export class CharacterGenerator extends ObjectGenerator<Character> {
  constructor(map: GameMap) {
    super(map);
  }
  public generateObject(id: string, position: Position, map: GameMap): Character {
    return new Character(
      id,
      position,
      map,
      new AttackUpHandler(
        new AttackDownHandler(new AttackRightHandler(new AttackLeftHandler(null)))
      )
    );
  }
}
