import { CardPattern } from '../card-pattern/card-pattern';
import { CardPatternType } from '../card-pattern/card-pattern-type';
import { Player } from '../player/player';

export abstract class RoundTemplate {
  roundCardPatternType!: CardPatternType;
  topPlay!: CardPattern;
  topPlayer!: Player;
  passedPlayers!: Player[];

  protected abstract beforeRound(): void;
  protected abstract ongoingRound(): void;
  protected abstract endRound(): void;
  start() {
    this.beforeRound();
  }
}
