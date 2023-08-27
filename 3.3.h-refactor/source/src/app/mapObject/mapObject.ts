import { EMapObjectSymbol } from "../enum/mapObjectSymbol.enum";
import { Position } from "../position";

export abstract class MapObject {
  protected _id!: string;

  protected position: Position;

  constructor(id: string, position: Position) {
    this.id = id;
    this.position = position;
  }

  public abstract getName(): string;
  public abstract getSymbol(): EMapObjectSymbol;
  public getPosition() {
    return this.position;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public printFlag(): string {
    return this.getSymbol();
  }
}
