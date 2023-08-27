import { ETreasureType } from "../../enum/treasureType.enum";
import { Invincible } from "../../state/invincible";
import { Role } from "../role/role";
import { Treasure } from "./treasure";

export class SuperStar extends Treasure {
  static readonly PROBABILITY: number = 0.1;

  public getName(): string {
    return "無敵星星";
  }

  protected getEffect(toucher: Role): void {
    toucher.setState(new Invincible(toucher));
  }

  getType() {
    return ETreasureType.SuperStar;
  }
}
