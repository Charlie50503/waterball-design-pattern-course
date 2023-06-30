import { Card } from '../card/card';
import { CardPattern } from './card-pattern';
import { CardPatternType } from './card-pattern-type';

export class Single extends CardPattern {
  name: string = '單張';
  type = CardPatternType.SINGLE;
  cardSize = 1;

  constructor(cards: Card[]) {
    super(cards);
  }

  protected setPoint(cards: Card[]) {
    let point = 0;
    cards.forEach((card) => {
      point = point + card.rank.value;
      point = point + card.suit.value;
    });
    return point;
  }

  isMatch(cards: Card[]): boolean {
    if (cards.length === this.cardSize) {
      return true;
    }
    return false;
  }
}
