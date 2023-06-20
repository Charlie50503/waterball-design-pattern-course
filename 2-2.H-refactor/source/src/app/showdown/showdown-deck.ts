import { Rank, ShowdownCard, Suit } from './showdown-card';
import { Deck } from '../template/deck';

export class showdownDeck extends Deck<ShowdownCard> {
  constructor() {
    const cards: ShowdownCard[] = [];
    for (const suit in Suit) {
      const suitAsNumber: number = parseInt(suit, 10);
      if (isNaN(suitAsNumber)) {
        continue;
      }

      for (let rank in Rank) {
        const rankAsNumber: number = parseInt(rank, 10);
        if (isNaN(rankAsNumber)) {
          continue;
        }

        cards.push(new ShowdownCard(rankAsNumber, suitAsNumber));
      }
    }
    super(cards);
    this.shuffle();
  }
}
