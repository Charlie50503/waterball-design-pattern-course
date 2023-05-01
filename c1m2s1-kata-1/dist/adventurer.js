"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adventurer = void 0;
const validatior_1 = require("./utils/validatior");
// class adventurer
class Adventurer {
    constructor(number, student, journey) {
        this.number = number;
        this.student = student;
        this.journey = journey;
    }
    get tourGroup() {
        return this._tourGroup;
    }
    set tourGroup(value) {
        if (value) {
            this._tourGroup = value;
        }
    }
    carryOn(mission) {
        this.student.carryOn(mission);
    }
    get number() {
        return this._number;
    }
    set number(value) {
        this._number = (0, validatior_1.shouldBePositive)(value);
    }
    get student() {
        return this._student;
    }
    set student(value) {
        if (value) {
            this._student = value;
        }
    }
    get journey() {
        return this._journey;
    }
    set journey(value) {
        if (value) {
            this._journey = value;
        }
    }
}
exports.Adventurer = Adventurer;
