import { CommandLineAction } from '../services/inputCommand.service';
import { AbstractDeck } from './abstractDeck';
import { AbstractPlayer } from './abstractPlayer';
export abstract class AbstractGame {
  players!: AbstractPlayer[];
  deck!: AbstractDeck;
  maxHandCardSize: number;

  constructor(players: AbstractPlayer[],
    deck: AbstractDeck,
    maxHandCardSize:number) {
    this.players = players;
    this.deck = deck;
    this.maxHandCardSize = maxHandCardSize;
  }

  async initGame(): Promise<void> {
    await this.nameAllPlayers();
    this.doShuffle();
    this.initPlayerHand();
  }
  abstract runGame(deltaTime: number): void;
  abstract runOneRound(): void;


  private async nameAllPlayers(): Promise<void> {
    this.players.forEach(async (player, index) => {
      const playerName = await CommandLineAction.inputPlayerName(index + 1);
      player.nameHimself(playerName);
    });
  }
  private doShuffle(): void {
    this.deck.shuffle();
  }
  private initPlayerHand(): void {
    for (let i = 0; i < this.maxHandCardSize; i++) {
      this.players.forEach((player) => {
        player.drawCard(this.deck.spliceCard());
      });
    }
  }
}
