import { Card } from './card/card';
import { Rank, ranks } from './card/rank';
import { Suit, suits } from './card/suit';
export class Deck {
  cards: Card[] = [];

  constructor() {
    ranks.forEach((rank) => {
      suits.forEach((suit) => {
        this.cards.push(new Card(rank, suit));
      });
    });

    this.cards = this.shuffle(this.cards);
  }

  shuffle(cards: Card[]) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }

  drawCard(): Card {
    return this.cards.splice(this.cards.length - 1, 1)[0];
  }
}
