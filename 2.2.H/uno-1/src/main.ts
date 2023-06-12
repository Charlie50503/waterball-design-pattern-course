import { Deck } from "./app/deck";
import { Game } from "./app/game";
import { PlayerCardPile } from "./app/playedCardPile";

function main(){
  const game = new Game(new Deck(),new PlayerCardPile());
  game.runGame();
}

main();