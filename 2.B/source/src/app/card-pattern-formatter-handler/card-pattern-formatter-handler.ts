import { CardPattern } from '../card-pattern/card-pattern';
import { Card } from '../card/card';

export abstract class CardPatternFormatterHandler {
  private next: CardPatternFormatterHandler | null;

  constructor(next: CardPatternFormatterHandler | null) {
    this.next = next;
  }

  handle(cards: Card[]): CardPattern {
    if (this.match(cards)) {
      return this.doHandle(cards);
    } else if (this.next) {
      return this.next.handle(cards);
    }
    throw Error('沒有匹配的牌型');
  }
  abstract doHandle(cards: Card[]): CardPattern;
  abstract match(cards: Card[]): boolean;
}
