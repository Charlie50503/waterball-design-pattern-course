import { Game } from "./game";
import { Hero } from "./hero";

function main(){
  const hero1 = new Hero("水球潘","WaterBall");
  const hero2 = new Hero("火球潘","Earth");
  const game = new Game(hero1,hero2);
  game.start();
}
main()