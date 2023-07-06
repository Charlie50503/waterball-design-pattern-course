import { Card } from '../card/card';
import { CardPattern } from './card-pattern';
import { CardPatternType } from './card-pattern-type';

export class Straight extends CardPattern {
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

  protected getCardSize() {
    return 5;
  }

  public getType(): CardPatternType {
    return CardPatternType.STRAIGHT;
  }

  public getName(): string {
    return '順子';
  }
}
