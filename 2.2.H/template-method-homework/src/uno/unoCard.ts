import { AbstractCard } from '../template/abstractCard';

export class UnoCard extends AbstractCard {
  color: Color;
  number: UnoNumber;

  constructor(color: Color, number: UnoNumber) {
    super();
    this.color = color;
    this.number = number;
  }

  display(): void {
    console.log(`卡片顏色: ${this.color},卡片數字: ${this.number}`);
  }
}

export enum Color {
  BLUE,
  RED,
  YELLOW,
  GREEN,
}

export enum UnoNumber {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
}
