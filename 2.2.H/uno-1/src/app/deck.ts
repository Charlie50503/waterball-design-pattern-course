import { Card } from './card/card';
import { Color } from './card/color';
import { UnoNumber } from './card/uno-number';

export class Deck {
  cards: Card[] = [];

  constructor() {
    this.cards = this.initCards();
  }

  // 洗牌 使用 Fisher-Yates Shuffle 算法
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
    // this.cards.forEach((card)=>{
    //   console.log(card);
    // })
  }

  private initCards() {
    let cards: Card[] = [];

    for (const unoNumber in UnoNumber) {
      if (typeof UnoNumber[unoNumber as keyof typeof UnoNumber] === 'string') {
        for (const color in Color) {
          if (typeof Color[color as keyof typeof Color] === 'string') {
            cards.push(
              new Card(
                Color[color as keyof typeof Color],
                UnoNumber[unoNumber as keyof typeof UnoNumber]
              )
            );
          }
        }
      }
    }

    return cards
  }

  refresh(playedCards: Card[]) {
    this.cards = [...this.cards, ...playedCards];
    this.shuffle();
  }
}
