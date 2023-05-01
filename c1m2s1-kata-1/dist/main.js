"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const big_js_1 = __importDefault(require("big.js"));
const journey_1 = require("./journey");
const student_1 = require("./student");
const chapter_1 = require("./chapter");
const mission_1 = require("./mission");
const videoScene_1 = require("./scene/videoScene");
const challenge_1 = require("./challenge");
class Main {
    setupChapters() {
        const challenge = new challenge_1.Challenge("第一個任務", 1);
        const mission = new mission_1.Mission(1, "OOA", challenge, [
            new videoScene_1.VideoScene("第1個影片", 1, 300),
            new videoScene_1.VideoScene("第2個影片", 2, 300),
            new videoScene_1.VideoScene("第3個影片", 3, 300),
            new videoScene_1.VideoScene("第4個影片", 4, 300),
        ]);
        const missions = [mission];
        const chapter = new chapter_1.Chapter("物件導向新手村", 1, missions);
        return [chapter];
    }
    setup() {
        // 註冊學生
        const student = new student_1.Student("johnny", "password", new Array(), new Array());
        // 開設旅程
        const journey = new journey_1.Journey("軟體設計模式精通之旅", "說明", new big_js_1.default(10000), this.setupChapters(), new Array(), new Array());
        // 學員參與旅程
        const adventurer = journey.join(student);
        const tourGroup = adventurer.tourGroup;
        const adventurers = tourGroup.adventurers;
        // 查看學員目前正在執行的第一巷任務
        const missionCarryOn = student.getMissionCarryOns()[0];
        console.log("學員目前正在執行的第一項任務", student.getAccount(), missionCarryOn.mission.name);
        // 完成這項任務
        missionCarryOn.complete();
    }
}
const main = new Main();
main.setup();
