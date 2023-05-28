import { Earth } from './Earth';
import { FireBall } from "./FireBall";
import { WaterBall } from "./WaterBall";
import { Game } from "./game";
import { Hero } from "./hero";

function main(){
  const hero1 = new Hero("水球潘",new WaterBall());
  const hero2 = new Hero("火球潘",new Earth());
  const game = new Game(hero1,hero2);
  game.start();
}
main()