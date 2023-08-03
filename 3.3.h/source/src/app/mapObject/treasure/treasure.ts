import { Position } from '../../position';
import { MapObject, mapObjectType } from '../mapObject.interface';
import { Role } from '../role';

export abstract class Treasure extends MapObject {
  static readonly PROBABILITY:number;
  printFlag(): string {
    return 'x';
  }

  // public abstract getProbability(): number;

  public abstract onTouch(toucher: Role): void;

  getType(): mapObjectType {
    return mapObjectType.treasure
  }


}


// 定義一個 MapObjectConstructor 接口，該接口代表一個具有特定構造函數的類型，該函數可以用來創建新的 MapObject 對象
export type TreasureConstructor = {
  new (): Treasure;
};
