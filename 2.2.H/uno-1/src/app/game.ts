import { Deck } from "./deck";
import { AIPlayer } from "./player/aiPlayer";
import { HumanPlayer } from "./player/humanPlayer";
import { Player } from "./player/player";
import { CommandLineStrategy } from "./playerActionStrategy/commandLineStrategy";
import { RandomStrategy } from "./playerActionStrategy/RandomStrategy";

export class Game {
  players:Player[] = [];
  deck:Deck;

  constructor(deck:Deck){
    this.players = this.initialPlayers();
    this.deck = deck;
    this.deck.shuffle();
  }

  runGame(){}
  onOneRound(){}
  showWinner(){
    
  }

  initialPlayers(){
    const player1 = new AIPlayer(1,new RandomStrategy());
    player1.nameHimself("AI1");
    const player2 = new AIPlayer(1,new RandomStrategy());
    player1.nameHimself("AI2");
    const player3 = new AIPlayer(1,new RandomStrategy());
    player1.nameHimself("AI3");
    const player4 = new HumanPlayer(1,new CommandLineStrategy());
    player1.nameHimself("Human1");
    return [player1,player2,player3,player4]
  }

  createPlayer(){
    
  }
}