import { EMapObjectSymbol } from "../../enum/mapObjectSymbol.enum";
import { ETreasureType } from "../../enum/treasureType.enum";
import { MapObject } from "../mapObject";
import { Role } from "../role/role";

export abstract class Treasure extends MapObject {
  static readonly PROBABILITY: number;

  public abstract getName(): string;
  public getSymbol() {
    return EMapObjectSymbol.treasure;
  }
  public onTouch(toucher: Role) {
    console.log(toucher.getName(), "獲得了", this.getName());
    this.getEffect(toucher);
  }

  public abstract getType(): ETreasureType;
  protected abstract getEffect(toucher: Role): void;
}
