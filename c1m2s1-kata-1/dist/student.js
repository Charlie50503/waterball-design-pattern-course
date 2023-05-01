"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const levelSheet_1 = require("./levelSheet");
const missionCarryOn_1 = require("./missionCarryOn");
class Student {
    // 每一個學生誕生的時候都必須給他一個帳號跟密碼
    constructor(account, password, missionCarryOns, adventurers) {
        this.level = 1;
        this.exp = 0;
        this.setAccount(account);
        this.setPassword(password);
        this.setMissionCarryOns(missionCarryOns);
        this.setAdventurers(adventurers);
    }
    getAdventurers() {
        return this.adventurers;
    }
    getMissionCarryOns() {
        return this.missionCarryOns;
    }
    gainExp(exp) {
        this.exp += exp;
        let newLevel = Student.LevelSheet.query(this.exp);
        let levelUp = newLevel - this.level;
        // 印出獎勵學員獲得的經驗值加上帳號
        console.log(`${this.account} 獲得了 ${exp} 經驗值`);
        // 實現 levelUp
        for (let i = 0; i < levelUp; i++) {
            this.levelUp();
        }
    }
    levelUp() {
        this.level++;
        // 印出學員等級提升至新的等級
        console.log(`${this.account} 等級提升至 ${this.level}`);
    }
    carryOn(mission) {
        console.log(`學員 ${this.account} 开始新任務:${mission.name}`);
        // new MissionCarryOn
        const missionCarryOn = new missionCarryOn_1.MissionCarryOn(this, mission);
        this.missionCarryOns.push(missionCarryOn); // 建立單向關聯
        return missionCarryOn;
    }
    // add getter and setter
    getAccount() {
        return this.account;
    }
    setAccount(account) {
        this.account = account;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
    getLevel() {
        return this.level;
    }
    setLevel(level) {
        this.level = level;
    }
    getExp() {
        return this.exp;
    }
    setExp(exp) {
        this.exp = exp;
    }
    setMissionCarryOns(missionCarryOns) {
        if (missionCarryOns) {
            this.missionCarryOns = missionCarryOns;
        }
    }
    setAdventurers(adventurers) {
        this.adventurers = adventurers;
    }
}
Student.LevelSheet = new levelSheet_1.LevelSheet();
exports.Student = Student;
