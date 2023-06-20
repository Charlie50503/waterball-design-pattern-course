import { Showdown } from "./app/showdown/showdown";
import { AIShowdownPlayer, HumanShowdownPlayer } from "./app/showdown/showdown-player";
import { Hand } from "./app/template/hand";
import { UNO } from "./app/uno-2/uno";
import { AIUnoPlayer, HumanUnoPlayer, UnoPlayer } from "./app/uno-2/uno-player";
// async function main(){
//   const players = [
//     new AIUnoPlayer("player1",new Hand()),
//     new HumanUnoPlayer("player2",new Hand()),
//     new AIUnoPlayer("player3",new Hand()),
//     new AIUnoPlayer("player4",new Hand()),
//   ]
//   const uno = new UNO(players);
//   await uno.startGame();
// }

// main();

async function main(){
  const players = [
    new AIShowdownPlayer("player1",new Hand()),
    new HumanShowdownPlayer("player2",new Hand()),
    new AIShowdownPlayer("player3",new Hand()),
    new AIShowdownPlayer("player4",new Hand()),
  ]
  const showdown = new Showdown(players);
  await showdown.startGame();
}

main();