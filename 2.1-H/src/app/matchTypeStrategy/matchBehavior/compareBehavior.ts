import { MatchBasedItem } from "../habitBased.interface";

export abstract class CompareBehavior {
  protected _reverse: boolean;

  constructor(reverse: boolean = false) {
    this._reverse = reverse;
    
  }
  abstract compare(a: MatchBasedItem, b: MatchBasedItem) :1 | -1 | 0
}

export class HabitBasedCompareBehavior extends CompareBehavior {
  constructor(reverse:boolean){
    super(reverse);
    this.compare = this.compare.bind(this);
  }
  compare(a: MatchBasedItem, b: MatchBasedItem) {
    if (a.point > b.point) {
      return this._reverse ? 1 : -1;
    }
    if (a.point < b.point) {
      return this._reverse ? -1 : 1;
    }
    // a 必須等於 b
    return 0;
  }
}

export class DistanceBasedCompareBehavior extends CompareBehavior {
  constructor(reverse:boolean){
    super(reverse);
    this.compare = this.compare.bind(this);
  }
  compare(a: MatchBasedItem, b: MatchBasedItem) {
    if (a.point > b.point) {
      return this._reverse ? -1 : 1;
    }
    if (a.point < b.point) {
      return this._reverse ? 1 : -1;
    }
    // a 必須等於 b
    return 0;
  }
}
