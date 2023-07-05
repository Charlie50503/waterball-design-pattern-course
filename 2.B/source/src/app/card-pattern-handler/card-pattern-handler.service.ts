import { Card } from '../card/card';
import { Rank, RankText } from '../card/rank';

export class CardPatternHandlerService {
  countRanks(cards: Card[]) {
    const counts = new Map<RankText, number>();
    for (const card of cards) {
      counts.set(card.rank.text, (counts.get(card.rank.text) || 0) + 1);
    }
    return counts;
  }
  hasValueInDuplicatesCount(countMap: Map<RankText, number>, value: number) {
    for (const count of countMap.values()) {
      if (count === value) {
        return true;
      }
    }
    return false;
  }

  compareArrays(arr1: string[], arr2: string[]) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    return sortedArr1.every((value, index) => value === sortedArr2[index]);
  }

  isNotDuplicatesNumber(cardRanks:string[]){
    let cardRandSet = new Set(cardRanks);
    return cardRandSet.size === cardRanks.length;
  }
}
