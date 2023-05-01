"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const length_1 = require("../utils/length");
const validatior_1 = require("../utils/validatior");
// create Scene abstract class constructors has name number and create getter setter 
class Scene {
    // 添加建構子並使用setter
    constructor(name, number, expAward) {
        this.setName(name);
        this.setNumber(number);
        this.setExpAward(expAward);
    }
    setExpAward(expAward) {
        this.expAward = expAward;
    }
    setName(name) {
        this.name = (0, length_1.lengthShouldBe)(name, 30);
    }
    setNumber(number) {
        this.number = (0, validatior_1.shouldBePositive)(number);
    }
    getName() {
        return this.name;
    }
    getNumber() {
        return this.number;
    }
    getExpAward() {
        return this.expAward;
    }
}
exports.Scene = Scene;
