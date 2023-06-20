export type UnoNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export enum UnoColor {
  BLUE,
  RED,
  YELLOW,
  GREEN
}
export class UnoCard {
  color: UnoColor;
  number: UnoNumber;

  constructor(color: UnoColor, number: UnoNumber) {
    this.color = color;
    this.number = number;
  }

  isMatch(card:UnoCard){
    return this.color===card.color || this.number === card.number
  }
}
