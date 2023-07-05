import { CardPattern } from "./card-pattern/card-pattern";
import { Player } from "./player/player";

export class Round {
  topPlay: CardPattern | null = null;

  prevPlayer: Player | null = null;

  constructor(){
  }

  isFirstPlayOfRound(){
    return this.topPlay===null;
  }
}