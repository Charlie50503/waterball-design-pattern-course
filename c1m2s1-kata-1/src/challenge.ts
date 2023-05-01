import { lengthInRange, lengthShouldBe } from "./utils/length";
import { shouldBePositive } from "./utils/validatior";

export class Challenge {
  private _name: string;
  private _number: number;

  constructor(
    name: string,
    number: number
  ){
    this.number = number;
    this.name = name;
  }

  public get number(): number {
    return this._number;
  }
  public set number(value: number) {
    this._number = shouldBePositive(value);
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = lengthInRange(value,1,30);
  }

}

