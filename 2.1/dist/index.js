"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./game");
const hero_1 = require("./hero");
function main() {
    const hero1 = new hero_1.Hero("水球潘", "WaterBall");
    const hero2 = new hero_1.Hero("火球潘", "Earth");
    const game = new game_1.Game(hero1, hero2);
    game.start();
}
main();
