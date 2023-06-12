import { Card } from "./card/card";

export class Hand {
  private _cards: Card[] = [];

  constructor(){

  }

  public get cards(): Card[] {
    return this._cards;
  }
  public set cards(value: Card[]) {
    if(value.length > 5){
      throw new Error("cards must be less 5.")
    }
    this._cards = value;
  }

}