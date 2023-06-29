import { Rank } from './rank';
import { Suit } from './suit';
export class Card {
  rank: Rank;
  suit: Suit;

  constructor(rank: Rank, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
  }

  displayCard(){
    console.log(`${this.suit.text}[${this.rank}]`);
  }
}
