import { CardPattern } from "../card-pattern/card-pattern";
import { Card } from "../card/card";
import { Play } from "./play";

export class HumanPlay  extends Play{
  public play(): void {

  }

  public playHook(): void {

  }

  public isContainsClubThreeInFirstPlay(cards: Card[]): boolean {
    return true;
  }

  public isSameCardPattern(
    cardPattern1: CardPattern,
    cardPattern2: CardPattern
  ): boolean {
    return true;
  }
}