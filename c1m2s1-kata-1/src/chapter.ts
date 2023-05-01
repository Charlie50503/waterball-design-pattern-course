import { Mission } from "./mission";
import { lengthInRange, lengthShouldBe } from "./utils/length";
import { shouldBePositive } from "./utils/validatior";

export class Chapter {
  name: string;
  number: number;
  missions: Array<Mission>;
  // 添加建構子並使用setter
  constructor(name: string, number: number, missions: Array<Mission>) {
    this.setName(name);
    this.setNumber(number);
    this.setMissions(missions);
  }


  getFirstMission(): Mission {
    return this.missions[0];
  }

  // add getter and setter
  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = lengthInRange(name, 1, 30);
  }

  public getMissions(): Array<Mission> {
    return this.missions;
  }
  public getNumber(): number {
    return this.number;
  }

  public setNumber(number: number): void {
    this.number = shouldBePositive(number);
  }

  public setMissions(missions: Array<Mission>) {
    if (missions && missions.length > 0) {
      this.missions = missions
    }
  }
}