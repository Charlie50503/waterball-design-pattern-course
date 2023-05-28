import { AttackType } from "./attackType";
import { Hero } from "./hero";

export class WaterBall implements AttackType {
  attack(attacker: Hero, attacked: Hero) {
    attacked.hp = attacked.hp - attacker.hp * 0.5;
    console.log("英雄" + attacker.name + "造成" + attacker.hp * 0.5 + "點傷害");
  }
}