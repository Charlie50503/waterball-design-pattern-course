import { CardPattern } from '../card-pattern/card-pattern';
import { Card } from '../card/card';

export abstract class CardPatternHandler {
  private next: CardPatternHandler | null;
  protected abstract cardSize: number;

  constructor(next: CardPatternHandler | null) {
    this.next = next;
  }

  handle(cards: Card[]): CardPattern {
    if (this.isMatch(cards)) {
      return this.doHandle(cards);
    } else if (this.next) {
      return this.next.handle(cards);
    }
    throw Error('沒有匹配的牌型');
  }
  abstract doHandle(cards: Card[]): CardPattern;
  abstract isMatch(cards: Card[]): boolean;
}
