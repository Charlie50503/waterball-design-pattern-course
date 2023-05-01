"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoScene = void 0;
const scene_1 = require("./scene");
//extend Scene class
class VideoScene extends scene_1.Scene {
    constructor(name, number, expAward) {
        super(name, number, expAward);
    }
    calculateExpAward() {
        // VideoScene 特定的經驗值算法
        return this.expAward * 1.5;
    }
}
exports.VideoScene = VideoScene;
