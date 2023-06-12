import { Color } from './color';
import { UnoNumber } from './uno-number';

export class Card {
  color: Color;
  unoNumber: UnoNumber;
  constructor(color: Color, unoNumber: UnoNumber) {
    this.color = color;
    this.unoNumber = unoNumber;
  }
}
