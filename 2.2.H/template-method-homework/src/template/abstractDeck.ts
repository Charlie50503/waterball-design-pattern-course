import { AbstractCard } from "./abstractCard";

export abstract class AbstractDeck {
  cards: AbstractCard[] = [];
  maxSize:number;

  constructor(maxSize:number){
    this.maxSize = maxSize;
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

  spliceCard(){
    if(this.cards.length === 0){
      throw Error("Deck is empty");
    }
    return this.cards.splice(this.cards.length-1,1)[0];
  }

  addCard(card:AbstractCard){
    if(this.cards.length < this.maxSize){
      this.cards.push(card);
    }else{
      throw Error("Deck is full");
    }
  }
}