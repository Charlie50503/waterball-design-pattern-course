import { ETreasureType } from "../../enum/treasureType.enum";
import { Invincible } from "../../state/invincible";
import { Orderless } from "../../state/orderless";
import { Role } from "../role/role";
import { Treasure } from "./treasure";

export class DevilFruit extends Treasure {
  static readonly PROBABILITY: number = 0.1;

  public getName(): string {
    return "惡魔果實";
  }

  protected getEffect(toucher: Role): void {
    toucher.setState(new Orderless(toucher));
  }

  getType() {
    return ETreasureType.DevilFruit;
  }
}
