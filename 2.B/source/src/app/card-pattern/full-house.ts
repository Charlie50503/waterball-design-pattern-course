import { Card } from '../card/card';
import { CardPattern } from './card-pattern';
import { CardPatternType } from './card-pattern-type';

export class FullHouse extends CardPattern {
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

  getCardSize(){
    return 5
  }

  protected getType(): CardPatternType {
      return CardPatternType.FULL_HOUSE;
  }

  public getName(): string {
      return '葫蘆';
  }
}
