import { Journey } from "./journey";
import { Mission } from "./mission";
import { Student } from "./student";
import { TourGroup } from "./tourGroup";
import { shouldBePositive } from "./utils/validatior";

// class adventurer
export class Adventurer {
  private _number: number;
  private _student: Student;
  private _journey: Journey;
  // 讓每一個冒險者都能知道他在哪個旅團裡面
  // 我們不初始化冒險者，因為冒險者是在之後才被加入旅團之中
  private _tourGroup: TourGroup;

  constructor(
    number: number,
    student: Student,
    journey: Journey
  ){
    this.number = number;
    this.student = student;
    this.journey = journey;
  }

  public get tourGroup(): TourGroup {
    return this._tourGroup;
  }
  public set tourGroup(value: TourGroup) {
    if(value){
      this._tourGroup = value;
    }
  }

  public carryOn(mission: Mission): void {
    this.student.carryOn(mission)
  }

  public get number(): number {
    return this._number;
  }
  public set number(value: number) {
    this._number = shouldBePositive(value);
  }
  public get student(): Student {
    return this._student;
  }
  public set student(value: Student) {
    if(value){
      this._student = value;
    }
  }
  public get journey(): Journey {
    return this._journey;
  }
  public set journey(value: Journey) {
    if(value){
      this._journey = value;
    }
  }
}