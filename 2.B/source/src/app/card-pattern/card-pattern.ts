import { Card } from '../card/card';
import { CardPatternType } from './card-pattern-type';

export abstract class CardPattern {
  private _cards!: Card[];
  public point: number;

  constructor(cards: Card[]) {
    this.cards = cards;
    this.point = this.setPoint(cards);
  }

  protected abstract setPoint(cards: Card[]): number;

  public isSmallThan(target: CardPattern) {
    if (!this.isSameCardPatternType(target)) {
      throw new Error('必須是同種類型的牌型');
    }
    return this.point <= target.point;
  }

  public isSameCardPatternType(target: CardPattern) {
    return this.getType() === target.getType();
  }

  public get cards(): Card[] {
    return this._cards;
  }
  public set cards(value: Card[]) {
    if (this.getCardSize() !== value.length) {
      throw Error('牌數不一樣');
    }
    this._cards = value;
  }

  public abstract getName(): string;
  protected abstract getCardSize(): number;

  public abstract getType(): CardPatternType;
}
