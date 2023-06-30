import { Card } from '../card/card';
import { CardPattern } from './card-pattern';
import { CardPatternType } from './card-pattern-type';

export class FullHouse extends CardPattern {
  name: string = '葫蘆';
  type = CardPatternType.FULL_HOUSE;
  cardSize = 5;

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

}
