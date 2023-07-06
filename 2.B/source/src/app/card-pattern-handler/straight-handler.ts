import { CardPattern } from '../card-pattern/card-pattern';
import { Straight } from '../card-pattern/straight';
import { Card } from '../card/card';
import { CardPatternHandler } from './card-pattern-handler';
import { CardPatternHandlerService } from './card-pattern-handler.service';

export class StraightHandler extends CardPatternHandler {
  protected cardSize: number = 5;
  private cardPatternHandlerService: CardPatternHandlerService;
  constructor(
    next: CardPatternHandler | null,
    cardPatternHandlerService: CardPatternHandlerService
  ) {
    super(next);
    this.cardPatternHandlerService =
      cardPatternHandlerService;
  }

  doHandle(sortedCards: Card[]): CardPattern {
    return new Straight(sortedCards);
  }

  isMatch(sortedCards: Card[]): boolean {
    return this.isStraight(sortedCards);
  }

  isStraight(sortedCards: Card[]) {
    const cardRanks = sortedCards.map((card) => {
      return card.rank.text;
    });
    if(!this.cardPatternHandlerService.isNotDuplicatesNumber(cardRanks)){
      return false;
    }
    return straightAllPatterns.some((straightPattern) =>
      this.cardPatternHandlerService.compareArrays(
        straightPattern.combination,
        cardRanks
      )
    );
  }
}

export const straightAllPatterns = [
  {
    combination: ['A', '2', '3', '4', '5'],
    point: 1,
  },
  {
    combination: ['3', '4', '5', '6', '7'],
    point: 2,
  },
  {
    combination: ['4', '5', '6', '7', '8'],
    point: 3,
  },
  {
    combination: ['5', '6', '7', '8', '9'],
    point: 4,
  },
  {
    combination: ['6', '7', '8', '9', '10'],
    point: 5,
  },
  {
    combination: ['7', '8', '9', '10', 'J'],
    point: 6,
  },
  {
    combination: ['8', '9', '10', 'J', 'Q'],
    point: 7,
  },
  {
    combination: ['9', '10', 'J', 'Q', 'K'],
    point: 8,
  },
  {
    combination: ['10', 'J', 'Q', 'K', 'A'],
    point: 9,
  },
  {
    combination: ['J', 'Q', 'K', 'A', '2'],
    point: 10,
  },
  {
    combination: ['Q', 'K', 'A', '2', '3'],
    point: 11,
  },
  {
    combination: ['K', 'A', '2', '3', '4'],
    point: 12,
  },
  {
    combination: ['2', '3', '4', '5', '6'],
    point: 13,
  },
];
