import { Card } from './card/card';

export class PlayerCardPile {
  cards: Card[] = [];

  public addCard(card: Card) {
    this.cards.push(card);
  }
  public clear() {
    this.cards = [];
  }

  public getLastCard(): Card | undefined {
    return this.cards[this.cards.length - 1]
      ? this.cards[this.cards.length - 1]
      : undefined;
  }
}
