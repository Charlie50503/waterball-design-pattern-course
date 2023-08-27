import { ETreasureType } from "../../enum/treasureType.enum";
import { Healing } from "../../state/healing";
import { Invincible } from "../../state/invincible";
import { Role } from "../role/role";
import { Treasure } from "./treasure";

export class HealingPotion extends Treasure {
  static readonly PROBABILITY: number = 0.15;

  public getName(): string {
    return "補血罐";
  }

  protected getEffect(toucher: Role): void {
    toucher.setState(new Healing(toucher));
  }

  getType() {
    return ETreasureType.HealingPotion;
  }
}
