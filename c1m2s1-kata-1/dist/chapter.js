"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chapter = void 0;
const length_1 = require("./utils/length");
const validatior_1 = require("./utils/validatior");
class Chapter {
    // 添加建構子並使用setter
    constructor(name, number, missions) {
        this.setName(name);
        this.setNumber(number);
        this.setMissions(missions);
    }
    getFirstMission() {
        return this.missions[0];
    }
    // add getter and setter
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = (0, length_1.lengthInRange)(name, 1, 30);
    }
    getMissions() {
        return this.missions;
    }
    getNumber() {
        return this.number;
    }
    setNumber(number) {
        this.number = (0, validatior_1.shouldBePositive)(number);
    }
    setMissions(missions) {
        if (missions && missions.length > 0) {
            this.missions = missions;
        }
    }
}
exports.Chapter = Chapter;
