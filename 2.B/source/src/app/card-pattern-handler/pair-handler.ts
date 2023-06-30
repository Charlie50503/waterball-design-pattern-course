import { CardPattern } from '../card-pattern/card-pattern';
import { FullHouse } from '../card-pattern/full-house';
import { Card } from '../card/card';
import { CardPatternHandler } from './card-pattern-handler';
import { CardPatternHandlerService } from './card-pattern-handler.service';

export class PairHandler extends CardPatternHandler {
  protected cardSize: number = 2;
  private cardPatternHandlerService: CardPatternHandlerService;
  constructor(
    next: CardPatternHandler | null,
    cardPatternHandlerService: CardPatternHandlerService
  ) {
    super(next);
    this.cardPatternHandlerService =
      cardPatternHandlerService;
  }

  doHandle(cards: Card[]): CardPattern {
    return new FullHouse(cards);
  }

  isMatch(cards: Card[]): boolean {
    if (cards.length !== this.cardSize) {
      return false;
    }

    const counts = this.cardPatternHandlerService.countRanks(cards);

    if (
      this.cardPatternHandlerService.hasValueInDuplicatesCount(
        counts,
        2
      )
    ) {
      return true;
    }

    return false;
  }
}
