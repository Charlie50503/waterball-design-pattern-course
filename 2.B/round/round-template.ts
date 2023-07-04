import { Big2 } from './../big2';
import { PlayResult, PlayResultStatus } from './../play/play';
import { CardPattern } from '../card-pattern/card-pattern';
import { CardPatternType } from '../card-pattern/card-pattern-type';
import { Player } from '../player/player';

export abstract class RoundTemplate {
  roundCardPatternType!: CardPatternType;
  topPlay!: CardPattern | null;
  topPlayer!: Player;
  passedPlayers!: Player[];
  turn: number = 0;
  players:Player[];
  currentPlayerId!: number;
  // isEndOfRound: boolean = false;

  big2:Big2;

  constructor(players:Player[],big2:Big2) {
    this.players = players;
    this.big2 = big2;
  }

  protected abstract beforeRound(): void;
  protected abstract ongoingRound(): void;
  protected endRound(){
    this.topPlay = null;
  };
  start() {
    this.beforeRound();
    this.ongoingRound();
    this.endRound();
  }

  nextPlayer(){
    const passedIdSet = new Set(this.passedPlayers.map((player) => player.id));
    const ids = this.players.filter(player=>!passedIdSet.has(player.id)).map(player=>player.id);
    const currentPlayerId =  ids.find(id=>id >=((this.currentPlayerId+1)%this.players.length));
    if(currentPlayerId){
      return this.currentPlayerId = currentPlayerId;
    }
    throw Error("沒找到玩家ID")
  }

  setInitialCurrentPlayerId(id:number){
    this.currentPlayerId = id;
  }

  getCurrentPlayer(): Player{
    return this.players[this.currentPlayerId];
  }

  playPattern(playResult:PlayResult){
    if(playResult.type===PlayResultStatus.CONTINUE){
      this.topPlay = playResult.playedCardPattern!;
      this.nextPlayer();
    }else if(playResult.type===PlayResultStatus.END){
      this.isEndOfRound = true;
    }else if(playResult.type===PlayResultStatus.PASS){
      this.passedPlayers.push(this.getCurrentPlayer());
      this.nextPlayer();
    }else{
      throw Error('不符合遊戲規則');
    }
  }

  isEndOfRound(player:Player) {
    this.passedPlayers.length === 3 || player.hand.isHandCardEmpty();
  }

}
