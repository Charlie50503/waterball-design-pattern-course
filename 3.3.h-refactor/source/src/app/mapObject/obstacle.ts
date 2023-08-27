import { EMapObjectSymbol } from "../enum/mapObjectSymbol.enum";
import { Position } from "../position";
import { MapObject } from "./mapObject";

export class Obstacle extends MapObject {
  constructor(id: string, position: Position) {
    super(id, position);
  }

  public getName(): string {
    return "障礙物";
  }

  public getSymbol(): EMapObjectSymbol {
    return EMapObjectSymbol.obstacle;
  }
}
