import { CardPattern } from './card-pattern/card-pattern';
import { Deck } from './deck';
import { Player } from './player/player';

export class Big2 {
  players: Player[] = [];
  topPlayer!: Player;
  deck!: Deck;
  turn: number = 0;
  isGameOver: boolean = false;
  topPlay: CardPattern | null = null;

  constructor() {}

  initial() {
    this.namePlayers();
    this.deck = new Deck();
  }

  namePlayers() {}

  start() {}

  endOfGame() {
    const winner = this.getWinner();
    console.log(`The winner is ${winner.name}`);
  }

  getWinner() {
    const [winner] = this.players.filter(
      (player) => player.hand.cards.length === 0
    );
    if (!winner) {
      throw Error('沒找到贏家');
    }
    return winner;
  }
}
