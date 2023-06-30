import { CardPattern } from '../card-pattern/card-pattern';
import { FullHouse } from '../card-pattern/full-house';
import { Card } from '../card/card';
import { CardPatternHandler } from './card-pattern-handler';
import { CardPatternHandlerService } from './card-pattern-handler.service';

export class FullHouseHandler extends CardPatternHandler {
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

  doHandle(cards: Card[]): CardPattern {
    return new FullHouse(cards);
  }

  isMatch(cards: Card[]): boolean {
    if (cards.length !== this.cardSize) {
      return false;
    }
    return this.isFullHouse(cards);
  }

  // 判斷是否為葫蘆（三張同點數加一對）
  isFullHouse(cards: Card[]): boolean {
    const counts =
      this.cardPatternHandlerService.countRanks(cards);
    if (
      this.cardPatternHandlerService.hasValueInDuplicatesCount(
        counts,
        2
      ) &&
      this.cardPatternHandlerService.hasValueInDuplicatesCount(
        counts,
        3
      )
    ) {
      return true;
    }

    return false;
  }
}
