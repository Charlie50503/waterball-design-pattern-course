import { Card } from '../card/card';
import { CardPattern } from './card-pattern';
import { CardPatternType } from './card-pattern-type';
import { CardPatternService } from './card-pattern.service';

export class FullHouse extends CardPattern {
  name: string = '葫蘆';
  type = CardPatternType.FULL_HOUSE;
  cardSize = 5;

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
    return this.isFullHouse(cards);
  }

  // 判斷是否為葫蘆（三張同點數加一對）
  isFullHouse(sortedCards: Card[]): boolean {
    const counts = this.cardPatternService.countRanks(sortedCards);
    if (
      this.cardPatternService.hasValueInDuplicatesCount(counts, 2) &&
      this.cardPatternService.hasValueInDuplicatesCount(counts, 3)
    ) {
      return true;
    }

    return false;
  }
}
