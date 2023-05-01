"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Journey = void 0;
const big_js_1 = __importDefault(require("big.js"));
const length_1 = require("./utils/length");
const adventurer_1 = require("./adventurer");
const tourGroup_1 = require("./tourGroup");
class Journey {
    // 初始化 預設值
    constructor(name, description, price, chapters, adventurers, tourGroups) {
        // 透過setter變更值
        this.setChapters(chapters);
        this.setName(name);
        this.setDescription(description);
        this.setPrice(price);
        this.setAdventurers(adventurers);
        this.setTourGroups(tourGroups);
    }
    join(student) {
        let number = this.adventurers.length + 1; //建立學號
        // 建立與冒險者的雙向關聯
        let adventurer = new adventurer_1.Adventurer(number, student, this);
        this.adventurers.push(adventurer);
        // 因為學員類有冒險者類的關係，所以我們要把它放進去
        student.getAdventurers().push(adventurer);
        // 開始第一項任務
        let firstMission = this.getFirstMission();
        adventurer.carryOn(firstMission);
        // 匹配旅團
        const tourGroup = this.matchTourGroup(adventurer);
        tourGroup.add(adventurer);
        // 印出冒險者加入旅團與匹配致旅團，student.account,this.name,tourGroup
        console.log(`${student.getAccount()}, ${tourGroup.number} 加入了旅團`, tourGroup.number);
        return adventurer;
    }
    matchTourGroup(adventurer) {
        if (this.tourGroups.length > 0) {
            return this.tourGroups[Math.random() * this.tourGroups.length | 0];
        }
        return new tourGroup_1.TourGroup(1, this.adventurers);
    }
    //add getter and setter
    getTourGroups() {
        return this.tourGroups;
    }
    getFirstMission() {
        return this.chapters[0].getFirstMission();
    }
    getName() {
        return this.name;
    }
    setName(name) {
        try {
            this.name = (0, length_1.lengthShouldBe)(name, 30);
        }
        catch (error) {
        }
    }
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = (0, length_1.lengthShouldBe)(description, 30);
    }
    getPrice() {
        return this.price;
    }
    setPrice(price) {
        this.price = (0, length_1.lengthShouldBeBiggerThan)(price, new big_js_1.default(1));
    }
    setChapters(chapters) {
        if (chapters && chapters.length > 0) {
            this.chapters = chapters;
        }
    }
    getChapters() {
        return this.chapters;
    }
    setAdventurers(adventurers) {
        this.adventurers = adventurers;
    }
    getAdventurers() {
        return this.adventurers;
    }
    setTourGroups(value) {
        if (value) {
            this.tourGroups = value;
        }
    }
}
exports.Journey = Journey;
