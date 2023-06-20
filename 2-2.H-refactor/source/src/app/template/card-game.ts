import { Card } from "./card";
import { Deck } from "./deck";
import { Player } from "./player";

export abstract class CardGame<T extends Card,K extends Player<T>> {
  deck: Deck<T>;
  players: K[];
  constructor(deck: Deck<T>, players: K[]) {
    this.deck = deck;
    this.players = players;
  }
  abstract beforeGameStart():void
  abstract startGame() :Promise<void>
  abstract round() :Promise<void>
  abstract isInitialHandSizeMax() :void
  //確認是否達成遊戲結束條件
  abstract isGameOver() :boolean
  //確認有沒有贏家
  abstract checkHasWinner(player:K) :K | null
  // 遊戲開始hook
  abstract endGame() :void
}
