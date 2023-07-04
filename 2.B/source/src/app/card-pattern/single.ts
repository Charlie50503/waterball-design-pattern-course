import { Card } from '../card/card';
import { CardPattern } from './card-pattern';
import { CardPatternType } from './card-pattern-type';

export class Single extends CardPattern {

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
    return 1
  }

  protected getType(): CardPatternType {
    return CardPatternType.SINGLE;
  }

  public getName(): string {
    return '單張';
  }
}
