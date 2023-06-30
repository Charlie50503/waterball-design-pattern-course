import { Card } from '../card/card';
import { CardPatternType } from './card-pattern-type';
import { CardPatternService } from './card-pattern.service';

export abstract class CardPattern {
  public abstract name: string;
  public abstract type: CardPatternType;
  protected abstract cardSize: number;
  private _cards!: Card[];
  public point: number;

  constructor(cards: Card[]) {
    this.cards = cards;
    this.point = this.setPoint(cards);
  }

  protected abstract setPoint(cards: Card[]): number;

  public abstract isMatch(cards: Card[]): boolean;

  public isBiggerThan(target: CardPattern) {
    if (!this.isSameCardPatternType(target)) {
      throw new Error('必須是同種類型的牌型');
    }
    return this.point <= target.point;
  }

  private isSameCardPatternType(target: CardPattern) {
    return this.type === target.type;
  }

  public get cards(): Card[] {
    return this._cards;
  }
  public set cards(value: Card[]) {
    if (this.cardSize !== value.length) {
      throw Error('牌數不一樣');
    }
    this._cards = value;
  }
}
