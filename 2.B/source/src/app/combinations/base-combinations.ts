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

  getMaxCombination(): T | null {
    let point = 0;
    let maxPointCombination: T | null = null;
    this.combinations.forEach((combination, index) => {
      if (point < combination.point) {
        point = combination.point;
        index = index;
        maxPointCombination = combination;
      }
    });
    return maxPointCombination;
  }
  getMinCombination(): T | null {
    let point = Infinity;
    let maxPointCombination: T | null = null;
    this.combinations.forEach((combination, index) => {
      if (point > combination.point) {
        point = combination.point;
        index = index;
        maxPointCombination = combination;
      }
    });
    return maxPointCombination;
  }

  addCombination(combination: T) {
    this.combinations.push(combination);
  }

  abstract findAllCombinations(cards: Card[]): T[];

  isCombinationsEmpty(): boolean {
    return this.combinations.length === 0;
  }
}
