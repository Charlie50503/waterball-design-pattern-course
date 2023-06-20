import { UnoDeck } from './unoDeck';
import { AbstractGame } from "../template/abstractGame";
import { PlayedCards } from "./playedCards";
import { UnoPlayer } from "./unoPlayer/unoPlayer";

export class UnoGame extends AbstractGame {
  playedCards = new PlayedCards();
  constructor(players: UnoPlayer[]) {
    super(players,new UnoDeck(),5);
  }

  runGame(): void {
    this.runOneRound();
  }

  runOneRound(): void {
      
  }

  drawFirstCard(){
    this.playedCards.addCard(this.deck.spliceCard());
  }
}