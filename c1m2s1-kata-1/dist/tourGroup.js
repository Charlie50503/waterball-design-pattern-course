"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourGroup = void 0;
const validatior_1 = require("./utils/validatior");
class TourGroup {
    get adventurers() {
        return this._adventurers;
    }
    set adventurers(value) {
        if (value) {
            this._adventurers = value;
        }
        // 在設定冒險者是屬於這個旅團的時候，我們也要同時保證每一位冒險者都是屬於這個旅團
        for (let adventurer of this.adventurers) {
            adventurer.tourGroup = this;
        }
    }
    get number() {
        return this._number;
    }
    set number(value) {
        this._number = (0, validatior_1.shouldBePositive)(value);
    }
    constructor(number, adventurers) {
        this.number = number;
        this.adventurers = adventurers;
    }
    add(adventurer) {
        // 因為這裡是使用雙向的聚合關聯，所以我們也需要讓冒險者知道他被加入哪個旅團
        this.adventurers.push(adventurer);
        adventurer.tourGroup = this;
    }
}
exports.TourGroup = TourGroup;
