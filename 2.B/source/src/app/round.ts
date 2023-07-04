import { CardPattern } from "./card-pattern/card-pattern";
import { Player } from "./player/player";

export class Round {
  isFirstPlayerOfRound = true;
  passedPlayers: Player[] = [];
  topPlay: CardPattern | null = null;

  isGameOver = false;

  setPassedPlayer(player:Player){
    this.passedPlayers.push(player);
  }

  isEndOfRound(){
    return this.passedPlayers.length === 3 || this.isGameOver===true;
  }

  isFirstPlayOfRound(){
    return this.topPlay===null;
  }
}