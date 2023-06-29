import { CardPatternFormatterHandler } from '../card-pattern-formatter-handler/card-pattern-formatter-handler';
import { CardPattern } from '../card-pattern/card-pattern';
import { Card } from '../card/card';
import { Player } from '../player/player';

export abstract class Play {
  // cards: Card[] = [];
  // playCardPattern: CardPattern;
  isFirstPlay: boolean = true;
  cardPatternFormatterHandler: CardPatternFormatterHandler;
  constructor(cardPatternFormatterHandler: CardPatternFormatterHandler) {
    this.cardPatternFormatterHandler = cardPatternFormatterHandler;
  }

  isLegalPlay(topPlay: CardPattern, cards: Card[]) {
    try {
      const playCardPattern = this.formPlayCardHandle(cards);

      if (this.isSameCardPattern(topPlay, playCardPattern)) {
        throw Error('所出牌型不相同');
      }

      if (!this.isFirstPlay && !this.isContainsClubThreeInFirstPlay(cards)) {
        throw Error('第一次出牌必須包含梅花3');
      }
      return true;
    } catch (error) {}
  }
  public printPlayCards(player: Player, playCardPattern: CardPattern): void {
    // console.log(`玩家 ${player.name} 打出了 ${playCardPattern.name} <花色>[<數字>] <花色>[<數字>] <花色>[<數字>] ...`)
    let str = `玩家 ${player.name} 打出了 ${playCardPattern.name} `;
    playCardPattern.cards.forEach((card) => {
      str += card.displayCard() + ' ';
    });
    console.log(str);
  }
  public abstract isSameCardPattern(
    cardPattern1: CardPattern,
    cardPattern2: CardPattern
  ): boolean;
  public abstract isContainsClubThreeInFirstPlay(cards: Card[]): boolean;
  public formPlayCardHandle(cards: Card[]) {
    return this.cardPatternFormatterHandler.handle(cards);
  }
  public pass() {
    if (this.isLealPass()) {
      return true;
    } else {
      return false;
    }
  }
  public isLealPass(): boolean {
    // 判斷玩家是否在新的回合中的第一輪 PASS
    // 是-不合法
    // 否-合法
    // TODO 尚未實現
    return true;
  }
  public abstract playHook(): void;
  public play(): void {}
}
