import { CardPattern } from '../card-pattern/card-pattern';
import { FullHouse } from '../card-pattern/full-house';
import { Card } from '../card/card';
import { CardPatternHandler } from './card-pattern-handler';
import { CardPatternHandlerService } from './card-pattern-handler.service';

export class StraightFlushHandler extends CardPatternHandler {
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
    return new FullHouse(sortedCards);
  }

  isMatch(sortedCards: Card[]): boolean {
    return this.isStraight(sortedCards) && this.isFlush(sortedCards);
  }

  isStraight(sortedCards: Card[]) {
    const cardRanks = sortedCards.map((card) => {
      return card.rank.text;
    });
    return straightAllPatterns.some((straightPattern) =>
      this.cardPatternHandlerService.compareArrays(
        straightPattern.combination,
        cardRanks
      )
    );
  }

  isFlush(sortedCards: Card[]) {
    const firstSuit = sortedCards[0].suit.text;
    return sortedCards.every((card) => card.suit.text === firstSuit);
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
