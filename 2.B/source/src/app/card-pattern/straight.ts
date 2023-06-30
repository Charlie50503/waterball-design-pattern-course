import { Card } from '../card/card';
import { CardPattern } from './card-pattern';
import { CardPatternType } from './card-pattern-type';

export class Straight extends CardPattern {
  name: string = '順子';
  type = CardPatternType.STRAIGHT;
  cardSize = 5;

  constructor(cards: Card[]) {
    super(cards);
  }

  override setPoint(sortedCards: Card[]): number {
    let point = 0;
    sortedCards.forEach((card) => {
      point = point + card.rank.value;
    });
    return point;
  }
}
