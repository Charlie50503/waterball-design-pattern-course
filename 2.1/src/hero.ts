export class Hero {
  name: string
  hp = 500;

  attackType: string

  constructor(name: string, attackType: string) {
    this.name = name
    this.attackType = attackType
  }

  attack(hero: Hero) {
    // if(attackType=="Waterball"){
    //   造成一次傷害，傷害值為自己血量* 0.5
    //  }esle if(attackType=="fireball"){
    //   連續造成三次傷害，每次的傷害值為50
    //  }else if(attackType=="earth"){
    //   連續造成十次傷害，每次的傷害值為20
    //  }
    if (this.attackType === "WaterBall") {
      hero.hp = hero.hp - this.hp * 0.5;
      console.log("英雄" + this.name + "造成" + this.hp * 0.5 + "點傷害");
    } else if (this.attackType === "FireBall") {
      for (let index = 0; index < 3; index++) {
        hero.hp -= 50;
        console.log("英雄" + this.name + "造成50點傷害");
      }

    } else if (this.attackType === "Earth") {
      for (let index = 0; index < 10; index++) {
        hero.hp -= 20;
        console.log("英雄" + this.name + "造成20點傷害");
      }

    }
  }

  isDead() {
    return this.hp <= 0;
  }
}



