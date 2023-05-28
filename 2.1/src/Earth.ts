import { AttackType } from "./attackType";
import { Hero } from "./hero";

export class Earth  implements AttackType{
  attack(attacker:Hero,attacked:Hero){
    for (let index = 0; index < 10; index++) {
      attacked.hp -= 20;
      console.log("英雄" + attacker.name + "造成20點傷害");
    }
  }
}