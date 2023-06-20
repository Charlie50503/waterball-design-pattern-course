import { AbstractCard } from './abstractCard';
import { AbstractHand } from './abstractHand';

export abstract class AbstractPlayer {
  name!: string;
  hand: AbstractHand;

  constructor(maxHandSize: number) {
    this.hand = new AbstractHand(maxHandSize);
  }

  nameHimself(name: string) {
    this.name = name;
  }

  // abstract showCard:any;

  drawCard(card: AbstractCard): void {
    this.hand.cards.push(card);
  }
}
