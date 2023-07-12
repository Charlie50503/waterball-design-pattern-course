import { CardPattern } from '../card-pattern/card-pattern';
import { Card } from '../card/card';

export abstract class BaseCombinations<T extends CardPattern> {
  combinations: T[] = [];

  filterHasClubThreeCombinations(): T[] {
    return this.combinations.filter((combination) => {
      return combination.cards.some((card) => {
        return card.suit.text === 'C' && card.rank.text === '3';
      });
    });
  }

  filterBiggerThanTopPlayCombinations(target: T) {
    return this.combinations.filter((item) => {
      return !item.isSmallThan(target);
    });
  }

  abstract findAllCombinations(cards: Card[]): T[];

  isCombinationsEmpty(): boolean {
    return this.combinations.length === 0;
  }
}
