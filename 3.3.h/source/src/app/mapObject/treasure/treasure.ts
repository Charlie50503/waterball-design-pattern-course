import { Position } from '../../position';
import { MapObject, mapObjectType } from '../mapObject.interface';
import { Role } from '../role';

export abstract class Treasure extends MapObject {
  static readonly PROBABILITY:number;
  // is 被獲得
  isAcquired = false;
  printFlag(): string {
    return 'x';
  }

  public abstract getEffect(toucher: Role): void;

  public onTouch(toucher: Role){
    this.isAcquired = true;
    console.log(toucher.getName(), '獲得了', this.getName());
    this.getEffect(toucher);
  };

  getType(): mapObjectType {
    return mapObjectType.treasure
  }
}


// 定義一個 MapObjectConstructor 接口，該接口代表一個具有特定構造函數的類型，該函數可以用來創建新的 MapObject 對象
export type TreasureConstructor = {
  new (): Treasure;
};
