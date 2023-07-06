import { FullHouse } from '../card-pattern/full-house';
import { Single } from '../card-pattern/single';
import { Card } from '../card/card';
import { RankText } from '../card/rank';
import { BaseCombinations } from './base-combinations';

export class FullHouseCombinations extends BaseCombinations<FullHouse> {

  findAllCombinations(cards: Card[]): FullHouse[] {
    const cardsClone = [...cards];
    let counts = new Map<RankText, number>();

    // 計算每種點數的牌的數量
    for (let card of cardsClone) {
      if (counts.has(card.rank.text)) {
        counts.set(card.rank.text, counts.get(card.rank.text)! + 1);
      } else {
        counts.set(card.rank.text, 1);
      }
    }

    // 過濾出那些數量大於等於2的點數
    let pairs = Array.from(counts).filter(([rank, count]) => count >= 2);
    // 過濾出那些數量大於等於3的點數
    let triples = Array.from(counts).filter(([rank, count]) => count >= 3);

    let fullHouses: FullHouse[] = [];

    for (let [tripletRank, _] of triples) {
      for (let [pairRank, _] of pairs) {
        // 確保"三條"和"對子"的數字是不同的
        if (tripletRank !== pairRank) {
          let tripletCards = cardsClone.filter(card => card.rank.text === tripletRank).slice(0, 3);
          let pairCards = cardsClone.filter(card => card.rank.text === pairRank).slice(0, 2);
          fullHouses.push(new FullHouse(tripletCards.concat(pairCards)));
        }
      }
    }

    return fullHouses;
  }

}
