import { AbstractCard } from './abstractCard';

export class AbstractHand {
  cards: AbstractCard[] = [];
  
  maxSize: number;

  constructor(maxSize:number){
    this.maxSize = maxSize
  }

  addCard(card: AbstractCard){
    if(this.cards.length < this.maxSize){
      this.cards.push(card);
    }else{
      throw Error("Hand is full");
    }
  }
}
