import { AttackType } from "./attackType";

export class Hero {
  name: string
  hp = 500;

  attackType: AttackType

  constructor(name: string, attackType: AttackType) {
    this.name = name
    this.attackType = attackType
  }

  attack(hero:Hero){
    this.attackType.attack(this,hero);
  }

  isDead() {
    return this.hp <= 0;
  }
}



