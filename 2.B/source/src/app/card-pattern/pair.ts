import { Card } from '../card/card';
import {
  countDuplicates,
  hasValueInDuplicatesCount,
} from '../utils/utils-function';
import { CardPattern } from './card-pattern';
import { CardPatternType } from './card-pattern-type';

export class Pair extends CardPattern {
  name: string = '對子';
  type = CardPatternType.Pair;
  cardSize = 2;

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
    if (cards.length !== this.cardSize) {
      return false;
    }

    const duplicateCounts = countDuplicates(cards);

    if (hasValueInDuplicatesCount(duplicateCounts, 2)) {
      return true;
    }

    return false;
  }
}
