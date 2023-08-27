import { Poisoned } from "./../../state/poisoned";
import { ETreasureType } from "../../enum/treasureType.enum";
import { Invincible } from "../../state/invincible";
import { Role } from "../role/role";
import { Treasure } from "./treasure";

export class Poison extends Treasure {
  static readonly PROBABILITY: number = 0.25;

  public getName(): string {
    return "毒藥";
  }

  protected getEffect(toucher: Role): void {
    toucher.setState(new Poisoned(toucher));
  }

  getType() {
    return ETreasureType.SuperStar;
  }
}
