import { Card } from './card';
import { Hand } from './hand';

export class Player<T extends Card> {
  name!: String;
  hand: Hand<T>;

  constructor(name: string, hand: Hand<T>) {
    this.nameHimself(name);
    this.hand = hand;
  }

  nameHimself(name: string) {
    this.name = name;
  }

}
