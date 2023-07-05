import { CardPattern } from './card-pattern/card-pattern';
import { Card } from './card/card';

export class Hand {
  cards: Card[] = [];

  printHandCards() {
    let indexStr = '';
    this.cards.forEach((card, index) => {
      indexStr = indexStr + index + '    ';
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
      if (a.rank.value !== b.rank.value) {
        return a.rank.value - b.rank.value;
      }
      return a.suit.value - b.suit.value;
    });
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  isHandCardEmpty(){
    return this.cards.length === 0
  }

  filterCards(cardPattern:CardPattern){
    this.cards.filter(card=>{
      return
    })
    this.cards = this.cards.filter(card =>
      !cardPattern.cards.some(c => c.rank.value === card.rank.value && c.suit.value === card.suit.value)
    );
  }
}
