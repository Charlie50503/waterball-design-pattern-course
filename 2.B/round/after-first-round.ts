import { Card } from '../card/card';
import { Player } from '../player/player';
import { RoundTemplate } from './round-template';

export class AfterFirstRound extends RoundTemplate {
  protected beforeRound() {

  }
  // protected ongoingRound() {
  //   while (!this.isEndOfRound) {
  //     const player = this.getCurrentPlayer();
  //     const playResult = player.play(this);
  //     this.playPattern(playResult);
  //     if (this.passedPlayers.length === 3) {
  //       this.isEndOfRound = true;
  //     }
  //     this.nextPlayer();
  //     this.turn++;
  //   }
  // }

  protected ongoingRound() {
    do {
      const player = this.getCurrentPlayer();
      const playResult = player.play(this);
      this.playPattern(playResult);
      this.turn++;
    } while (!this.isEndOfRound && this.passedPlayers.length !== 3);
  }
}
