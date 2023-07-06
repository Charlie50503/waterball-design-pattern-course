import { Straight } from './../card-pattern/straight';
import { FullHouse } from '../card-pattern/full-house';
import { Single } from '../card-pattern/single';
import { Card } from '../card/card';
import { RankText } from '../card/rank';
import { BaseCombinations } from './base-combinations';
import { straightAllPatterns } from '../card-pattern-handler/straight-handler';

export class StraightCombinations extends BaseCombinations<Straight> {
  findAllCombinations(cards: Card[]): Straight[] {
    const cardRanksSet = new Set(cards.map((card) => card.rank.text));
    const straights: Straight[] = [];

    for (const pattern of straightAllPatterns) {
      if (
        pattern.combination.every((rank) =>
        cardRanksSet.has(rank as RankText)
        )
      ) {
        // 如果牌組包含當前模式的所有數字，則創建一個新的順子
        const patternCombinationSet = new Set(pattern.combination);

        const matchCardMap = new Map<RankText, Card>();
        cards.forEach((card) => {
          if (
            patternCombinationSet.has(card.rank.text) &&
            !matchCardMap.has(card.rank.text)
          ) {
            matchCardMap.set(card.rank.text, card);
          }
        });
        const matchedCards: Card[] = [];
        matchCardMap.forEach((card, key) => {
          matchedCards.push(card);
        });

        straights.push(new Straight(matchedCards));
      }
    }

    return straights;
  }
}
