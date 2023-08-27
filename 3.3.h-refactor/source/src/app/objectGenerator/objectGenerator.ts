import { GameMap } from "../gameMap";
import { MapObject } from "../mapObject/mapObject";
import { Position } from "../position";
import { v4 as uuidv4 } from "uuid";

export abstract class ObjectGenerator<T extends MapObject> {
  map: GameMap;

  constructor(map: GameMap) {
    this.map = map;
  }

  public generate(): T {
    const position = this.getRandomPosition();
    return this.generateObject(uuidv4(), position, this.map);
  }
  public abstract generateObject(id: string, position: Position, map?: GameMap): T;

  protected getRandomPosition(): Position {
    const position = new Position(
      this.getRandomNumber(this.map.getRowSize()),
      this.getRandomNumber(this.map.getColumnSize())
    );
    if (this.map.isPositionOccupied(position)) {
      return this.getRandomPosition();
    } else {
      return position;
    }
  }
  protected getRandomNumber(size: number) {
    return Math.floor(Math.random() * size);
  }
}
