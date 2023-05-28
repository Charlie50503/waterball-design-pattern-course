import { AttackType } from "./attackType";
import { Hero } from "./hero";

export class PowerBall implements AttackType {
  attack(attacker: Hero, attacked: Hero) {
    attacked.hp -= 500;
    console.log("英雄" + attacker.name + "造成50點傷害");
  }
}