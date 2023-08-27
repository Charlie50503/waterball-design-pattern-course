import { ETreasureType } from "../../enum/treasureType.enum";
import { Invincible } from "../../state/invincible";
import { Teleport } from "../../state/teleport";
import { Role } from "../role/role";
import { Treasure } from "./treasure";

export class DokodemoDoor extends Treasure {
  static readonly PROBABILITY: number = 0.1;

  public getName(): string {
    return "任意門";
  }

  protected getEffect(toucher: Role): void {
    toucher.setState(new Teleport(toucher));
  }

  getType() {
    return ETreasureType.DokodemoDoor;
  }
}
