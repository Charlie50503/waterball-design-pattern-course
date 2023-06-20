export enum Rank {
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Jack = 11,
  Queen = 12,
  King = 13,
  Ace = 14,
}

export enum Suit {
  Clubs = 0,
  Diamonds = 1,
  Hearts = 2,
  Spades = 3,
}

export class ShowdownCard {
  rank: Rank;
  suit: Suit;

  constructor(rank: Rank, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
  }

  compare(other: ShowdownCard): number {
    if (this.rank < other.rank) {
      return -1;
    } else if (this.rank > other.rank) {
      return 1;
    } else {
      return 0;
    }
  }
}
