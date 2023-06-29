import { Card } from './card/card';

export class Hand {
  cards: Card[] = [];

  printHandCards() {}

  sortCards() {
    this.cards.sort((a, b) => {
      if (a.suit.value === b.suit.value) {
        return b.rank.value - a.rank.value;
      } else {
        return b.suit.value - a.suit.value;
      }
    });
  }

  addCard(card: Card) {
    this.cards.push(card);
  }
}
