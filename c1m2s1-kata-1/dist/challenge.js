"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Challenge = void 0;
const length_1 = require("./utils/length");
const validatior_1 = require("./utils/validatior");
class Challenge {
    constructor(name, number) {
        this.number = number;
        this.name = name;
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
}
exports.Challenge = Challenge;
