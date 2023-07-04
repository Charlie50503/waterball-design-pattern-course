import { Card } from '../card/card';
import { Player } from '../player/player';
import { RoundTemplate } from './round-template';

export class FirstRound extends RoundTemplate {
  findC3Player(): Player {
    return this.players.find((player) =>
      this.isContainsClubThreeInFirstPlay(player.hand.cards)
    )!;
  }

  public isContainsClubThreeInFirstPlay(cards: Card[]) {
    return cards.some((card) => {
      return card.rank.text === '3' && card.suit.text === 'C';
    });
  }

  protected beforeRound() {
    console.log('新的回合開始了。');
    const player = this.findC3Player();
    this.setInitialCurrentPlayerId(player.id);
    console.log(`輪到${player.name}了`);
    const playResult = player.play(this);
    this.playPattern(playResult);
    this.nextPlayer();
    this.turn++;
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
      console.log(`輪到${player.name}了`);
      const playResult = player.play(this);
      this.playPattern(playResult);
      this.turn++;
    } while (!this.isEndOfRound && this.passedPlayers.length !== 3);
  }
}
