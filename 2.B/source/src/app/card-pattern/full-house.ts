import { Card } from '../card/card';
import {
  countDuplicates,
  findValueInDuplicatesCount,
  hasValueInDuplicatesCount,
} from '../utils/utils-function';
import { CardPattern } from './card-pattern';
import { CardPatternType } from './card-pattern-type';

export class FullHouse extends CardPattern {
  name: string = '葫蘆';
  type = CardPatternType.FullHouse;
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

  isMatch(cards: Card[]): boolean {
    if (cards.length !== this.cardSize) {
      return false;
    }

    const duplicateCounts = countDuplicates(cards);

    if (
      hasValueInDuplicatesCount(duplicateCounts, 2) &&
      hasValueInDuplicatesCount(duplicateCounts, 3)
    ) {
      return true;
    }

    return false;
  }
}
