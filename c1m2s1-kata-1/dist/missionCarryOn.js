"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionCarryOn = exports.IState = void 0;
var IState;
(function (IState) {
    IState[IState["ONGOING"] = 0] = "ONGOING";
    IState[IState["COMPLETED"] = 1] = "COMPLETED";
})(IState = exports.IState || (exports.IState = {}));
class MissionCarryOn {
    constructor(student, mission) {
        this._state = IState.ONGOING;
        this.student = student;
        this.mission = mission;
    }
    complete() {
        this._state = IState.COMPLETED;
        console.log("學員已經完成任務", this._student.getAccount(), this._mission.name);
        this._student.gainExp(this._mission.calculateExpAward());
    }
    get mission() {
        return this._mission;
    }
    set mission(value) {
        this._mission = value;
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
    }
    get student() {
        return this._student;
    }
    set student(value) {
        this._student = value;
    }
}
exports.MissionCarryOn = MissionCarryOn;
