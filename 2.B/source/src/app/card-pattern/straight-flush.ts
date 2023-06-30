import { Card } from '../card/card';
import { CardPattern } from './card-pattern';
import { CardPatternType } from './card-pattern-type';

export class Straight extends CardPattern {
  name: string = '同花順';
  type = CardPatternType.STRAIGHT_FLUSH;
  cardSize = 5;

  constructor(cards: Card[]) {
    super(cards);
  }

  override setPoint(sortedCards: Card[]): number {
    let point = 0;
    sortedCards.forEach((card) => {
      point = point + card.rank.value;
    });
    point = point + sortedCards[0].suit.value;
    return point;
  }
}
