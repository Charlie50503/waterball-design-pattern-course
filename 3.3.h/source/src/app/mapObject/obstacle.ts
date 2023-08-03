import { Position } from '../position';
import { MapObject, mapObjectType } from './mapObject.interface';
export class Obstacle extends MapObject {
  position!: Position;

  printFlag(): string {
    return '□';
  }

  getType(): mapObjectType {
    return mapObjectType.obstacle
  }

  public getName(): string {
      return "障礙物";
  }
}
