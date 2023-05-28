"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(hero1, hero2) {
        this.hero1 = hero1;
        this.hero2 = hero2;
    }
    start() {
        while (!this.hero1.isDead() && !this.hero2.isDead()) {
            this.hero1.attack(this.hero2);
            if (this.hero2.isDead()) {
                console.log("英雄" + this.hero1.name + "贏了");
                break;
            }
            this.hero2.attack(this.hero1);
            if (this.hero1.isDead()) {
                console.log("英雄" + this.hero2.name + "贏了");
                break;
            }
        }
    }
}
exports.Game = Game;
