import { ETreasureType } from "../../enum/treasureType.enum";
import { Invincible } from "../../state/invincible";
import { Stockpile } from "../../state/stockpile";
import { Role } from "../role/role";
import { Treasure } from "./treasure";

export class KingsRock extends Treasure {
  static readonly PROBABILITY: number = 0.1;

  public getName(): string {
    return "王者之印";
  }

  protected getEffect(toucher: Role): void {
    toucher.setState(new Stockpile(toucher));
  }

  getType() {
    return ETreasureType.KingsRock;
  }
}
