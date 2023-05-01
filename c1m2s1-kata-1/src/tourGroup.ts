import { Adventurer } from "./adventurer";
import { shouldBePositive } from "./utils/validatior";

export class TourGroup {
  private _number: number;
  // 讓每個旅團都能夠知道他有哪些冒險者在裡面
  private _adventurers: Array<Adventurer>;
  public get adventurers(): Array<Adventurer> {
    return this._adventurers;
  }
  public set adventurers(value: Array<Adventurer>) {
    if(value){
      this._adventurers = value;
    }
    // 在設定冒險者是屬於這個旅團的時候，我們也要同時保證每一位冒險者都是屬於這個旅團
    for(let adventurer of this.adventurers){
      adventurer.tourGroup = this
    }
  }
  public get number(): number {
    return this._number;
  }
  public set number(value: number) {
    this._number = shouldBePositive(value);
  }

  constructor(number: number,adventurers: Array<Adventurer>) {
    this.number = number;
    this.adventurers = adventurers;
  }

  add(adventurer:Adventurer){
    // 因為這裡是使用雙向的聚合關聯，所以我們也需要讓冒險者知道他被加入哪個旅團

    this.adventurers.push(adventurer);
    adventurer.tourGroup = this;
  }
}