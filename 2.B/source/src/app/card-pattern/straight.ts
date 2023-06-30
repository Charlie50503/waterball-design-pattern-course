import { Card } from '../card/card';
import { CardPattern } from './card-pattern';
import { CardPatternType } from './card-pattern-type';
import { CardPatternService } from './card-pattern.service';

export class Straight extends CardPattern {
  name: string = '順子';
  type = CardPatternType.STRAIGHT;
  cardSize = 5;

  constructor(private cardPatternService: CardPatternService, cards: Card[]) {
    super(cards);
  }

  isMatch(sortedCards: Card[]): boolean {
    return this.isStraight(sortedCards);
  }

  override setPoint(sortedCards: Card[]): number {
    let point = 0;
    sortedCards.forEach((card) => {
      point = point + card.rank.value;
    });
    return point;
  }

  isStraight(sortedCards: Card[]) {
    const cardRanks = sortedCards.map((card) => {
      return card.rank.text;
    });
    return straightAllPatterns.some((straightPattern) =>
      this.cardPatternService.compareArrays(
        straightPattern.combination,
        cardRanks
      )
    );
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
