"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mission = void 0;
const length_1 = require("./utils/length");
const validatior_1 = require("./utils/validatior");
class Mission {
    constructor(number, name, challenge, scenes) {
        this.number = number;
        this.name = name;
        this.challenge = challenge;
        this.scenes = scenes;
    }
    // 加總底下 scene 所有的經驗值
    calculateExpAward() {
        let sum = 0;
        this.scenes.forEach(scene => {
            sum += scene.calculateExpAward(); //多型
        });
        return sum;
    }
    get number() {
        return this._number;
    }
    set number(value) {
        this._number = (0, validatior_1.shouldBePositive)(value);
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = (0, length_1.lengthInRange)(value, 1, 30);
    }
    get challenge() {
        return this._challenge;
    }
    set challenge(value) {
        if (value) {
            this._challenge = value;
        }
    }
    get scenes() {
        return this._scenes;
    }
    set scenes(value) {
        if (value) {
            this._scenes = value;
        }
    }
}
exports.Mission = Mission;
