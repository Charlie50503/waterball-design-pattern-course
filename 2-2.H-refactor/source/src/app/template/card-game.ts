import { Card } from './card';
import { Deck } from './deck';
import { Player } from './player';

export abstract class CardGame<T extends Card, K extends Player<T>> {
  deck: Deck<T>;
  players: K[];
  roundTimes = 0;

  constructor(deck: Deck<T>, players: K[]) {
    this.deck = deck;
    this.players = players;
  }
  protected abstract beforeGameStart(): void;
  
  public async startGame(): Promise<void> {
    this.drawHand();
    this.beforeGameStart();
    await this.playGame();
    this.endGame();
  }
  
  protected async playGame(): Promise<void> {
    while (!this.isGameOver()) {
      await this.round();
      this.roundTimes++;
    }
  }

  protected abstract round(): Promise<void>;
  protected abstract isInitialHandSizeMax(): number;
  //確認是否達成遊戲結束條件
  protected abstract isGameOver(): boolean;
  // 遊戲開始hook
  protected abstract endGame(): void;

  private drawHand() {
    for (let index = 0; index < this.isInitialHandSizeMax(); index++) {
      this.players.forEach((player) => {
        player.hand.addCard(this.deck.drawCard()!);
      });
    }
  }
}
