import { Single } from '../card-pattern/single';
import { Card } from '../card/card';
import { BaseCombinations } from './base-combinations';

export class SingleCombinations extends BaseCombinations<Single> {
  findAllCombinations(cards: Card[]) {
    const combinations: Single[] = [];
    cards.forEach((card) => {
      combinations.push(new Single([card]));
    });
    return combinations;
  }
}
