"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lengthShouldBeBiggerThan = exports.lengthInRange = exports.lengthShouldBe = void 0;
// 實現一個限制string長度的通用方法 
function lengthShouldBe(str, maxLength) {
    if (str.length > maxLength) {
        throw Error(`String length (${str.length}) exceeds maximum length (${maxLength}).`);
    }
    return str;
}
exports.lengthShouldBe = lengthShouldBe;
function lengthInRange(str, minLength, maxLength) {
    console.log("lengthInRange", str.length >= minLength);
    console.log("lengthInRange", str.length <= maxLength);
    if (str.length < minLength) {
        throw Error(`String length ${str === null || str === void 0 ? void 0 : str.length} exceeds minimum length ${minLength}.`);
    }
    if (str.length > maxLength) {
        throw Error(`String length ${str === null || str === void 0 ? void 0 : str.length} exceeds maximum length ${maxLength}.`);
    }
    return str;
}
exports.lengthInRange = lengthInRange;
// create function and content is string should be bigger then input number size
function lengthShouldBeBiggerThan(str, minLength) {
    if (str < minLength) {
        throw Error(`String length (${str}) exceeds minimum length (${minLength}).`);
    }
    return str;
}
exports.lengthShouldBeBiggerThan = lengthShouldBeBiggerThan;
