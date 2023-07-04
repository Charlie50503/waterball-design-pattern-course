import { CardPattern } from './card-pattern/card-pattern';
import { Card } from './card/card';
import { Deck } from './deck';
import rl from './helper/helper';
import { PlayResultStatus } from './play/play';
import { Player } from './player/player';
import { Round } from './round';

export class Big2 {
  players: Player[] = [];
  topPlayer!: Player;
  deck!: Deck;
  isFirstPlay = true;
  isGameOver = false;

  constructor(
    players:Player[]
  ) {
    this.players = players;
  }

  async initial() {
    await this.namePlayers();
    this.deck = new Deck();
    this.initialDrawCard();
  }

  async start() {
    await this.initial();
    console.log("initial");

    await this.firstRound();
    if (!this.isGameOver) {
      await this.afterFirstRound();
    }
    await this.endOfGame();
  }

  endOfGame() {
    const winner = this.getWinner();
    console.log(`The winner is ${winner.name}`);
    // rl.close();
  }

  async namePlayers() {
    for (let index = 0; index < this.players.length; index++) {
      await this.players[index].nameHimselfHandler()
    }
  }

  initialDrawCard() {
    while (this.deck.cards.length > 0) {
      this.players.forEach((player) => {
        player.hand.addCard(this.deck.drawCard());
      });
    }
    this.players.forEach((player) => {
      player.hand.sortCards();
    })
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

  async firstRound() {
    console.log('新的回合開始了。');
    const round = new Round();
    await this.takeFirstTurn(round);
    while (!round.isEndOfRound()) {
      await this.takeTurn(round);
    }
    if (round.isGameOver) {
      this.isGameOver = true;
    }
  }

  async afterFirstRound(): Promise<void> {
    console.log('新的回合開始了。');
    const round = new Round();
    while (!round.isEndOfRound()) {
      await this.takeTurn(round);
    }
    if (round.isGameOver) {
      this.isGameOver = true;
    } else {
      return this.afterFirstRound();
    }
  }

  async takeFirstTurn(round: Round) {
    const hasC3Player = this.findC3Player();
    console.log(`輪到${hasC3Player.name}了`);
    const playedResult = await hasC3Player.play(round,this.isFirstPlay);
    if (playedResult.type === PlayResultStatus.CONTINUE) {
      round.topPlay = playedResult.playedCardPattern!;
      this.topPlayer = hasC3Player;
      this.isFirstPlay = false;
    } else {
      throw Error('動作不符合遊戲規則');
    }
  }

  async takeTurn(round: Round): Promise<void> {
    const currentPlayerId = this.findCurrentPlayerId(round)();
    const currentPlayer = this.players.find(player=>player.id===currentPlayerId)!;
    console.log(`輪到${currentPlayer.name}了`);
    const playedResult = await currentPlayer.play(round,this.isFirstPlay);
    if (playedResult.type === PlayResultStatus.CONTINUE) {
      round.topPlay = playedResult.playedCardPattern!;
      this.topPlayer = currentPlayer;
    } else if (playedResult.type === PlayResultStatus.END) {
    } else if (playedResult.type === PlayResultStatus.PASS) {
      round.setPassedPlayer(currentPlayer);
    } else {
      throw Error('不符合遊戲規則');
    }
  }

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

  findCurrentPlayerId(round:Round) {
    let nextPlayerId = (this.topPlayer.id + 1) % this.players.length;

    const passedPlayerIdSet = new Set(
      round.passedPlayers.map((player) => player.id)
    );
    return function nextPlayer(): number {
      if (passedPlayerIdSet.has(nextPlayerId)) {
        nextPlayerId++;
        return nextPlayer();
      }
      return nextPlayerId;
    };
  }
}
