import { Hand } from "./app/template/hand";
import { UNO } from "./app/uno-2/uno";
import { AIUnoPlayer, HumanUnoPlayer, UnoPlayer } from "./app/uno-2/uno-player";
function main(){
  const players = [
    new AIUnoPlayer("player1",new Hand()),
    new HumanUnoPlayer("player2",new Hand()),
    new AIUnoPlayer("player3",new Hand()),
    new AIUnoPlayer("player4",new Hand()),
  ]
  const uno = new UNO(players);
  uno.startGame();
}

main();