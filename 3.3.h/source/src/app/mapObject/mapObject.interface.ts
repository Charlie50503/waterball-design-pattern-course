import { Position } from '../position';

export abstract class MapObject {
  protected position!: Position;
  public abstract printFlag(): string;

  constructor(position: Position) {
    this.position = position;
  }

  public getPosition(): Position {
    return this.position;
  }

  public abstract getType(): mapObjectType

  public abstract getName(): string
}

// 定義一個 MapObjectConstructor 接口，該接口代表一個具有特定構造函數的類型，該函數可以用來創建新的 MapObject 對象
export type MapObjectConstructor = {
  new (position: Position): MapObject;
};

export enum mapObjectType  {
  hero,
  monster,
  treasure,
  obstacle
}