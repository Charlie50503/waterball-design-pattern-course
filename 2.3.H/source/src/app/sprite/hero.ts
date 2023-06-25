import { Sprite, SpriteType } from "./sprite";

export class Hero extends Sprite {
  type = SpriteType.Hero;

  hp: number = 30;

  increaseHP(amount : number) : void {
    this.hp += amount;
  }

  decreaseHP(amount : number) : void {
    this.hp -= amount;
  }

  isDead(){
    return this.hp <= 0
  }
}