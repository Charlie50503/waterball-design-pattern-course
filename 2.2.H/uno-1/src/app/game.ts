import { Deck } from './deck';
import { PlayerCardPile } from './playedCardPile';
import { AIPlayer } from './player/aiPlayer';
import { HumanPlayer } from './player/humanPlayer';
import { Player } from './player/player';
import { CommandLineStrategy } from './playerActionStrategy/commandLineStrategy';
import { RandomStrategy } from './playerActionStrategy/randomStrategy';
import rl from './utils/readline';

export class Game {
  private players: Player[] = [];
  private deck: Deck;
  private playerCardPile: PlayerCardPile;
  private limitHandSize = 5;
  private hasWinner = false;

  constructor(deck: Deck, playerCardPile: PlayerCardPile) {
    this.players = this.initialPlayers();
    this.deck = deck;
    this.playerCardPile = playerCardPile;
    this.deck.shuffle();
    this.drawCard();
  }

  public async runGame() {
    while (!this.hasWinner) {
      await this.runOneRound();
    }
    rl.close()
  }
  private async runOneRound() {
    for (const player of this.players) {
      const lastCard = this.playerCardPile.getLastCard();
      const showedCard = await player.showCard(lastCard);
      
      if (showedCard) {
        this.playerCardPile.addCard(showedCard);
        console.log(`上一張牌 花色:${lastCard?.color} 數字:${lastCard?.unoNumber}`);
      } else {
        const card = this.deck.cards.splice(0, 1)[0];
        if (card) {
          console.log(`玩家${player.name} PASS`);
          
          player.drawCard(card);

          console.log(`玩家${player.name} 抽牌`);
        } else {
          console.log(`牌不夠, 重新洗牌`);
          this.deck.refresh(this.playerCardPile.cards);
          this.playerCardPile.clear();
          this.playerCardPile.addCard(lastCard!);
        }
      }
      if (player.hand.cards.length === 0) {
        this.showWinner();
        break;
      }
    }
  }

  private showWinner() {
    const winner = this.players.find(
      (player) => player.hand.cards.length === 0
    )!;
    console.log(`Winner is ${winner.name}`);
    this.hasWinner = true;
  }

  private drawCard() {
    for (let index = 0; index < this.limitHandSize; index++) {
      this.players.forEach((player) => {
        const card = this.deck.cards.splice(0, 1)[0];
        player.drawCard(card);
      });
    }
  }

  private initialPlayers() {
    const player1 = new AIPlayer(1, new RandomStrategy());
    player1.nameHimself('AI1');
    const player2 = new AIPlayer(1, new RandomStrategy());
    player2.nameHimself('AI2');
    const player3 = new AIPlayer(1, new RandomStrategy());
    player3.nameHimself('AI3');
    const player4 = new HumanPlayer(1, new CommandLineStrategy());
    player4.nameHimself('Human1');
    return [player1, player2, player3, player4];
  }
}
