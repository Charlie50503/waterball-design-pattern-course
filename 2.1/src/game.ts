import { Hero } from "./hero";

export class Game {
  hero1: Hero;
  hero2: Hero;
  constructor(hero1:Hero,hero2:Hero){
    this.hero1 = hero1
    this.hero2 = hero2

  }
  start(){
    while(!this.hero1.isDead() && !this.hero2.isDead()){
      this.hero1.attack(this.hero2);
      if(this.hero2.isDead()){
        console.log("英雄" + this.hero1.name + "贏了");
        break;
      }
      this.hero2.attack(this.hero1);
      if(this.hero1.isDead()){
        console.log("英雄" + this.hero2.name + "贏了");
        break;
      }
    }
    
  }
}