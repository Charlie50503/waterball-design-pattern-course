import { Mission } from './mission';
import { Student } from './student';
export enum IState {
  ONGOING,
  COMPLETED
}

export class MissionCarryOn {
  private _state: IState = IState.ONGOING;
  private _student: Student;
 
  private _mission: Mission;

  constructor(student: Student, mission: Mission) {
    this.student = student;
    this.mission = mission;
  }
  public complete() {
    this._state = IState.COMPLETED;
    console.log("學員已經完成任務",this._student.getAccount(),this._mission.name);
    this._student.gainExp(this._mission.calculateExpAward());
  }

  public get mission(): Mission {
    return this._mission;
  }
  public set mission(value: Mission) {
    this._mission = value;
  }

  public get state(): IState {
    return this._state;
  }
  public set state(value: IState) {
    this._state = value;
  }

  public get student(): Student {
    return this._student;
  }
  public set student(value: Student) {
    this._student = value;
  }
}