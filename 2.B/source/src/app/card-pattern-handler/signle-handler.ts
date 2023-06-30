import { CardPattern } from '../card-pattern/card-pattern';
import { FullHouse } from '../card-pattern/full-house';
import { Card } from '../card/card';
import { CardPatternHandler } from './card-pattern-handler';
import { CardPatternHandlerService } from './card-pattern-handler.service';

export class SingleHandler extends CardPatternHandler {
  protected cardSize: number = 1;
  constructor(next: CardPatternHandler | null) {
    super(next);
  }

  doHandle(cards: Card[]): CardPattern {
    return new FullHouse(cards);
  }

  isMatch(cards: Card[]): boolean {
    if (cards.length === this.cardSize) {
      return true;
    }
    return false;
  }
}
