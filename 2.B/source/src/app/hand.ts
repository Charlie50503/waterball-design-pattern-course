import { Card } from './card/card';

export class Hand {
  cards: Card[] = [];

  printHandCards() {
    let indexStr = '';
    this.cards.forEach((card, index) => {
      indexStr = indexStr + index + '     ';
      if (card.rank.text === '10') {
        indexStr = indexStr + ' ';
      }
    });
    console.log(indexStr);
    let cardStr = '';
    this.cards.forEach((card) => {
      cardStr = cardStr + card.displayCard() + ' ';
    });
    console.log(cardStr);
  }

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
