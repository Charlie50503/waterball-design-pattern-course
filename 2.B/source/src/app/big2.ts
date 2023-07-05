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

  passCount: number = 0;

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

    await this.firstRound();

    if (!this.getWinner()) {
      await this.afterFirstRound();
    }
    await this.endOfGame();
  }

  endOfGame() {
    const winner = this.getWinner();
    if(!winner){
      throw Error("沒找到贏家")
    }
    console.log(`遊戲結束，遊戲的勝利者為 ${winner.name}`);
    rl.close();
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
      return null;
    }
    return winner;
  }

  async firstRound() {
    console.log('新的回合開始了。');
    const round = new Round();
    await this.takeFirstTurn(round);
    while (!this.getWinner() && !this.isGoNextRound()) {
      const currentPlayer = this.findCurrentPlayer(round);
      await this.takeTurn(currentPlayer, round);
    }
    if (this.getWinner()) {
      this.isGameOver = true;
    }else {
      this.passCount=0;
    }
  }

  async afterFirstRound(): Promise<void> {
    console.log('新的回合開始了。');
    const round = new Round();
    while (!this.getWinner() && !this.isGoNextRound()) {
      const currentPlayer = this.findCurrentPlayer(round);
      await this.takeTurn(currentPlayer, round);
    }
    if (this.getWinner()) {
      this.isGameOver = true;
    } else {
      this.passCount=0;
      return this.afterFirstRound();
    }
  }

  isGoNextRound(){
    return this.passCount>=3
  }

  async takeFirstTurn(round: Round) {
    const hasC3Player = this.findC3Player();
    console.log(`輪到${hasC3Player.name}了`);
    const playedResult = await hasC3Player.play(round,this.isFirstPlay);
    if (playedResult.type === PlayResultStatus.CONTINUE) {
      round.topPlay = playedResult.playedCardPattern!;
      this.topPlayer = hasC3Player;
      this.isFirstPlay = false;
      round.prevPlayer = hasC3Player;
    } else {
      throw Error('動作不符合遊戲規則');
    }
  }

  async takeTurn(currentPlayer:Player, round: Round): Promise<void> {
    console.log(`輪到${currentPlayer.name}了`);
    const playedResult = await currentPlayer.play(round,this.isFirstPlay);
    if (playedResult.type === PlayResultStatus.CONTINUE) {
      round.topPlay = playedResult.playedCardPattern!;
      this.topPlayer = currentPlayer;
      this.passCount = 0;
    } else if (playedResult.type === PlayResultStatus.END) {
    } else if (playedResult.type === PlayResultStatus.PASS) {
      this.passCount += 1;
    } else {
      throw Error('不符合遊戲規則');
    }
    round.prevPlayer = currentPlayer;
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

  findCurrentPlayer(round:Round){
    if(round.topPlay===null){
      return this.topPlayer;
    }

    const currentPlayerId = this.findCurrentPlayerId(round);
    const currentPlayer = this.players.find(player=>player.id===currentPlayerId)!;

    return currentPlayer;
  }


  findCurrentPlayerId(round:Round) {
    return (round.prevPlayer!.id + 1) % this.players.length
  }

}
