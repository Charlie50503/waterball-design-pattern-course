import { Card } from '../card/card';
import {
  compareArrays,
  countDuplicates,
  findValueInDuplicatesCount,
  hasValueInDuplicatesCount,
} from '../utils/utils-function';
import { CardPattern } from './card-pattern';
import { CardPatternType } from './card-pattern-type';

export class Straight extends CardPattern {
  name: string = '順子';
  type = CardPatternType.Pair;
  cardSize = 5;

  constructor(cards: Card[]) {
    super(cards);
  }

  isMatch(sortedCards: Card[]): boolean {
    return this.isStraight(sortedCards);
  }

  override setPoint(sortedCards: Card[]): number {
    let point = 0;
    const cardRanks = sortedCards.map((card) => {
      return card.rank.text;
    });
    if (this.isStraight(sortedCards)) {
      sortedCards.forEach((card) => {
        point = point + card.rank.value;
      });
    }
    if (this.isSameSuit(sortedCards)) {
      point = +sortedCards[0].suit.value;
    }
    return point;
  }

  isStraight(sortedCards: Card[]) {
    const cardRanks = sortedCards.map((card) => {
      return card.rank.text;
    });
    return straightAllPatterns.some((straightPattern) =>
      compareArrays(straightPattern.combination, cardRanks)
    );
  }

  isSameSuit(sortedCards: Card[]) {
    const firstCardSuit = sortedCards[0].suit.text;
    return sortedCards.every((card) => card.suit.text === firstCardSuit);
  }
}

const straightAllPatterns = [
  {
    combination: ['3', '4', '5', '6', '7'],
    point: 1,
  },
  {
    combination: ['4', '5', '6', '7', '8'],
    point: 2,
  },
  {
    combination: ['5', '6', '7', '8', '9'],
    point: 3,
  },
  {
    combination: ['6', '7', '8', '9', '10'],
    point: 4,
  },
  {
    combination: ['7', '8', '9', '10', 'J'],
    point: 5,
  },
  {
    combination: ['8', '9', '10', 'J', 'Q'],
    point: 6,
  },
  {
    combination: ['9', '10', 'J', 'Q', 'K'],
    point: 7,
  },
  {
    combination: ['10', 'J', 'Q', 'K', 'A'],
    point: 8,
  },
  {
    combination: ['2', '3', '4', '5', '6'],
    point: 9,
  },
];
