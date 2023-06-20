import { Card } from './card';

export class Hand<T extends Card> {
  cards: T[] = [];

  public addCard(card: T) {
    if(!card){
      throw Error("card is undefined");
    }
    this.cards.push(card);
  }

  public spliceCard(index: number) {
    return this.cards.splice(index, 1);
  }

  public findCard(index: number): T | null {
    return this.cards[index] ? this.cards[index] : null;
  }
}
