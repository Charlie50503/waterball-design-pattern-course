import { CardGame } from '../template/card-game';
import { UnoCard } from './uno-card';
import { UnoDeck } from './uno-deck';
import { UnoPlayer } from './uno-player';
import rl from '../helper/readline';

export class UNO extends CardGame<UnoCard, UnoPlayer> {
  topCard!: UnoCard;
  table: UnoCard[] = [];
  constructor(players: UnoPlayer[]) {
    super(new UnoDeck(), players);
  }

  protected beforeGameStart(): void {
    this.putCardToTable(this.deck.drawCard()!);
  }
  protected async round(): Promise<void> {
    for (let player of this.players) {
      this.putCardToTable(await player.takeTurn(this.topCard, this));
      const winner = this.checkHasWinner(player);
      if (winner) {
        break;
      }
    }
  }

  protected isInitialHandSizeMax() {
    return 5;
  }

  protected getWinner() {
    return this.players.filter((player) => player.hand.cards.length === 0)[0];
  }

  protected isGameOver(): boolean {
    return this.players.filter((player) => player.hand.cards.length === 0).length > 0
      ? true
      : false;
  }

  protected endGame(): void {
    console.log(`贏家是 ${this.getWinner().name}🎉🎉`);
    rl.close();
  }

  private putCardToTable(card: UnoCard | null) {
    if (!card) {
      return;
    }
    this.topCard = card;
    this.table.push(this.topCard);
  }

  private checkHasWinner(player: UnoPlayer) {
    return player.hand.cards.length === 0 ? player : null;
  }
}
