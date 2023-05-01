"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentScene = void 0;
const scene_1 = require("./scene");
//extend Scene class
class ContentScene extends scene_1.Scene {
    constructor(name, number, expAward) {
        super(name, number, expAward);
    }
    calculateExpAward() {
        // ContentScene 特定的經驗值算法
        return this.expAward * 1.1;
    }
}
exports.ContentScene = ContentScene;
