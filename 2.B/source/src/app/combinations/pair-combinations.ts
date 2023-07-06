import { Pair } from '../card-pattern/pair';
import { Card } from '../card/card';
import { Rank, RankText } from '../card/rank';
import { BaseCombinations } from './base-combinations';

export class PairCombinations extends BaseCombinations<Pair> {
  findAllCombinations(cards: Card[]) {
    let counts = new Map<RankText, number>();

    for (let card of cards) {
      if (counts.has(card.rank.text)) {
        counts.set(card.rank.text, counts.get(card.rank.text)! + 1);
      } else {
        counts.set(card.rank.text, 1);
      }
    }

    // 過濾出那些數量大於等於2的點數
    let pairs = Array.from(counts).filter(([rank, count]) => count >= 2);

    // 用上述的點數形成對子
    let validPairs = pairs.map(([rankText, count]) => {
      let validCards: Card[] = [];
      for (let index = 0; index < cards.length; index++) {
        if (validCards.length >= 2) {
          break;
        }
        if (cards[index].rank.text === rankText) {
          validCards.push(cards[index]);
        }
      }
      return validCards;
    });

    let combinations: Pair[] = [];

    validPairs.forEach((cards) => {
      combinations.push(new Pair(cards));
    });

    return combinations;
  }
}
