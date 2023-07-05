import { CardPatternHandler } from '../card-pattern-handler/card-pattern-handler';
import { CardPattern } from '../card-pattern/card-pattern';
import { Card } from '../card/card';
import { Player } from '../player/player';
import { Round } from '../round';

export abstract class Play {
  cardPatternHandler: CardPatternHandler;
  constructor(cardPatternHandler: CardPatternHandler) {
    this.cardPatternHandler = cardPatternHandler;
  }

  public isLegalPlay(topPlay: CardPattern | null, cards: Card[],isFirstPlay:boolean) {
    try {
      const playCardPattern = this.cardPatternHandler.handle(cards);

      if (topPlay && !topPlay.isSameCardPatternType(playCardPattern)) {
        throw Error('此牌型不合法，請再嘗試一次。');
      }

      if (topPlay && !topPlay.isSmallThan(playCardPattern)) {
        throw Error('此牌型不合法，請再嘗試一次。');
        // throw Error('所出牌型小於頂牌');
      }

      if (isFirstPlay && !this.isContainsClubThreeInFirstPlay(cards)) {
        throw Error('此牌型不合法，請再嘗試一次。');
        // throw Error('第一次出牌必須包含梅花3');
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  public printPlayCards(player: Player, playCardPattern: CardPattern): void {
    // console.log(`玩家 ${player.name} 打出了 ${playCardPattern.name} <花色>[<數字>] <花色>[<數字>] <花色>[<數字>] ...`)
    let str = `玩家 ${player.name} 打出了 ${playCardPattern.getName()} `;
    playCardPattern.cards.forEach((card) => {
      str += card.displayCard() + ' ';
    });
    console.log(str);
  }

  public printPlayPass(player:Player){
    console.log(`玩家 ${player.name} PASS.`);
  }

  public isContainsClubThreeInFirstPlay(cards: Card[]) {
    return cards.some((card) => {
      return card.rank.text === '3' && card.suit.text === 'C';
    });
  }

  public isLealPass(round: Round): boolean {
    if (!round.isFirstPlayOfRound()) {
      return true;
    }
    return false;
  }
  public abstract playHook(
    player: Player,
    round: Round,
    isFirstPlay:boolean
  ): Promise<CardPattern | PlayResultStatus.PASS>;
  public async play(
    player: Player,
    round: Round,
    isFirstPlay:boolean
  ): Promise<PlayResult> {
    // 印出玩家手牌
    player.hand.printHandCards();
    const playedCardPattern = await this.playHookHandler(
      player,
      round,
      isFirstPlay
    );

    if (player.hand.isHandCardEmpty()) {
      return new PlayResult(PlayResultStatus.END);
    }
    if (playedCardPattern === PlayResultStatus.PASS) {
      this.printPlayPass(player);
      return new PlayResult(PlayResultStatus.PASS);
    } else {
      this.printPlayCards(player, playedCardPattern);
      player.hand.filterCards(playedCardPattern);
      return new PlayResult(PlayResultStatus.CONTINUE, playedCardPattern);
    }
  }

  public async playHookHandler(
    player: Player,
    round: Round,
    isFirstPlay:boolean
  ): Promise<CardPattern | PlayResultStatus.PASS> {
    let playedCardPattern;
    try {
      playedCardPattern = await this.playHook(player, round, isFirstPlay);
    } catch (error) {
      console.log(error);
      return this.playHookHandler(player, round, isFirstPlay);
    }
    return playedCardPattern;
  }

  formCardPattern(cards: Card[]) {
    return this.cardPatternHandler.handle(cards);
  }
}

export class PlayResult {
  type: PlayResultStatus;
  playedCardPattern?: CardPattern;

  constructor(type: PlayResultStatus, playedCardPattern?: CardPattern) {
    this.type = type;
    this.playedCardPattern = playedCardPattern;
  }
}

export enum PlayResultStatus {
  PASS = 'PASS',
  CONTINUE = 'CONTINUE',
  END = 'END',
}
