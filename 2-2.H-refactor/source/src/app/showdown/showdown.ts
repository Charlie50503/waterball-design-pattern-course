import rl from '../helper/readline';
import { CardGame } from '../template/card-game';
import { ShowdownCard } from './showdown-card';
import { showdownDeck } from './showdown-deck';
import { ShowdownPlayer } from './showdown-player';

export class Showdown extends CardGame<ShowdownCard, ShowdownPlayer> {
  roundTimes = 0;

  constructor(players: ShowdownPlayer[]) {
    super(new showdownDeck(), players);
  }

  protected beforeGameStart(): void {}

  protected async round(): Promise<void> {
    let winner: ShowdownPlayer | null = null;
    let highestCard: ShowdownCard | null = null;
    for (const player of this.players) {
      const card = await player.takeTurn();
      if (highestCard === null || highestCard.compare(card) === -1) {
        highestCard = card;
        winner = player;
      }
    }

    if (winner) {
      winner.gainPoint();
      console.log(`${winner.name} 贏得了這回合，目前分數為 ${winner.point}`);
    }
  }

  protected isInitialHandSizeMax(): number {
    return 13;
  }

  protected getWinner() {
    let winner: ShowdownPlayer | null = null;
    for (const player of this.players) {
      if (winner === null || player.point > winner.point) {
        winner = player;
      }
    }
    return winner;
  }

  protected isGameOver(): boolean {
    return this.roundTimes >= 13;
  }

  protected endGame(): void {
    console.log(`贏家是 ${this.getWinner()!.name}🎉🎉`);
    rl.close();
  }
}
