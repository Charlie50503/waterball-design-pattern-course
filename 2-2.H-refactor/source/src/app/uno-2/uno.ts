import { Player } from './../template/player';
import { CardGame } from '../template/card-game';
import { UnoCard, UnoColor, UnoNumber } from './uno-card';
import { UnoDeck } from './uno-deck';
import { UnoPlayer } from './uno-player';
import rl from '../helper/readline';

export class UNO extends CardGame<UnoCard, UnoPlayer> {
  topCard!: UnoCard;
  table: UnoCard[] = [];
  hasWinner = false;
  constructor(players: UnoPlayer[]) {
    super(new UnoDeck(), players);
  }

  beforeGameStart(): void {
    for (let index = 0; index < this.isInitialHandSizeMax(); index++) {
      this.players.forEach((player) => {
        player.hand.addCard(this.deck.drawCard()!);
      });
    }
    this.putCardToTable(this.deck.drawCard()!);
  }

  async startGame(): Promise<void> {
    this.beforeGameStart();
    while (!this.hasWinner) {
      await this.round();
    }
    await rl.close();
    this.endGame();
  }

  async round(): Promise<void> {
    for (let player of this.players) {
      this.putCardToTable(await player.takeTurn(this.topCard, this));
      const winner = this.checkHasWinner(player);
      if (winner) {
        this.hasWinner = true;
        break;
      }
    }
  }

  putCardToTable(card: UnoCard | null) {
    if (!card) {
      return;
    }
    this.topCard = card;
    this.table.push(this.topCard);
  }

  isInitialHandSizeMax() {
    return 5;
  }

  checkHasWinner(player: UnoPlayer) {
    return player.hand.cards.length === 0 ? player : null;
  }

  getWinner() {
    return this.players.filter((player) => player.hand.cards.length === 0)[0];
  }

  endGame(): void {
    console.log(`贏家是 ${this.getWinner().name}🎉🎉`);
  }

  isGameOver(): boolean {
    return this.players.filter((player) => player.hand.cards.length === 0)
      ? true
      : false;
  }
}
