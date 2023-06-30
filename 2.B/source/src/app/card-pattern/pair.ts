import { Card } from '../card/card';
import { CardPattern } from './card-pattern';
import { CardPatternType } from './card-pattern-type';
import { CardPatternService } from './card-pattern.service';

export class Pair extends CardPattern {
  name: string = '對子';
  type = CardPatternType.PAIR;
  cardSize = 2;

  constructor(private cardPatternService: CardPatternService, cards: Card[]) {
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

    const counts = this.cardPatternService.countRanks(cards);

    if (this.cardPatternService.hasValueInDuplicatesCount(counts, 2)) {
      return true;
    }

    return false;
  }
}
