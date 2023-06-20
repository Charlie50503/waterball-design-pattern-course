import { Card } from './card';

export class Deck<T extends Card> {
  cards: T[] = [];

  constructor(cards: T[]) {
    this.cards = cards;
  }
  public shuffle() {
    let m = this.cards.length,
      t,
      i;
    // 如果還剩有元素未洗牌
    while (m) {
      // 選取剩餘元素…
      i = Math.floor(Math.random() * m--);
      // 並與當前元素進行交換
      t = this.cards[m];
      this.cards[m] = this.cards[i];
      this.cards[i] = t;
    }
    
  }

  public drawCard(): T {
    if (this.cards.length === 0) {
      throw Error('Deck is empty');
    }
    return this.cards.pop()!;
  }

  // 重新補充牌堆
  public refill(cards: T[]): void {
    this.cards = cards;
  }
}
