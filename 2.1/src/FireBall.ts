import { AttackType } from "./attackType";
import { Hero } from "./hero";

export class FireBall  implements AttackType{
  attack(attacker:Hero,attacked:Hero){
    for (let index = 0; index < 3; index++) {
      attacked.hp -= 50;
      console.log("英雄" + attacker.name + "造成50點傷害");
    }
  }
}