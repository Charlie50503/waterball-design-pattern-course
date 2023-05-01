import { lengthShouldBe } from "../utils/length";
import { shouldBePositive } from "../utils/validatior";

// create Scene abstract class constructors has name number and create getter setter 
export abstract class Scene {
  private name:string;
  private number:number;
  protected expAward:number;
  // 添加建構子並使用setter
  constructor(name:string,number:number,expAward:number){
    this.setName(name);
    this.setNumber(number);
    this.setExpAward(expAward);

  }

  public abstract calculateExpAward():number

  setExpAward(expAward: number) {
    this.expAward = expAward
  }

  setName(name: string): void {
    this.name = lengthShouldBe(name,30);
  }

  setNumber(number: number): void {
    this.number = shouldBePositive(number);
  }

  getName(): string {
    return this.name;
  }

  getNumber(): number {
    return this.number;
  }

  getExpAward(): number {
    return this.expAward;
  }
// export class Scene {

}