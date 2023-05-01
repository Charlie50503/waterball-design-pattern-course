import { Scene } from "./scene";

//extend Scene class
export class ContentScene extends Scene {
  constructor(
    name: string,
    number: number,
    expAward: number
  ){
    super(
      name,
      number,
      expAward
    );
  }

  public calculateExpAward():number{
    // ContentScene 特定的經驗值算法
    return this.expAward * 1.1;
  }
}