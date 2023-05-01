"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldBePositive = void 0;
function shouldBePositive(value) {
    if (typeof value !== "number") {
        throw Error("Value must be a number");
    }
    if (value <= 0) {
        throw Error("Value must be greater than 0");
    }
    if (Math.floor(value) !== value) {
        throw Error("Value must be a integer");
    }
    return value;
}
exports.shouldBePositive = shouldBePositive;
