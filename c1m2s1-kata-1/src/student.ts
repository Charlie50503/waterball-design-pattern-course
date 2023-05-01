import { Adventurer } from "./adventurer";
import { LevelSheet } from "./levelSheet";
import { Mission } from "./mission";
import { MissionCarryOn } from "./missionCarryOn";

export class Student {
  private static LevelSheet: LevelSheet = new LevelSheet();
  private account: string;
  // password 不允許從外部取得
  private password: string
  private level: number = 1;
  private exp: number = 0;
  private missionCarryOns: Array<MissionCarryOn>;
  private adventurers: Array<Adventurer>;

  // 每一個學生誕生的時候都必須給他一個帳號跟密碼
  constructor(account: string, password: string, missionCarryOns: Array<MissionCarryOn>
    ,
    adventurers:Array<Adventurer>
    ) {
    this.setAccount(account);
    this.setPassword(password);
    this.setMissionCarryOns(missionCarryOns);
    this.setAdventurers(adventurers);
  }

  getAdventurers(): Array<Adventurer> {
    return this.adventurers;
  }

  getMissionCarryOns(): Array<MissionCarryOn> {
    return this.missionCarryOns;
  }

  gainExp(exp: number) {
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

  levelUp(): void {
    this.level++;
    // 印出學員等級提升至新的等級
    console.log(`${this.account} 等級提升至 ${this.level}`);

  }

  carryOn(mission: Mission): MissionCarryOn {
    console.log(`學員 ${this.account} 开始新任務:${mission.name}`);
    // new MissionCarryOn
    const missionCarryOn = new MissionCarryOn(this, mission);
    this.missionCarryOns.push(missionCarryOn); // 建立單向關聯
    return missionCarryOn;
  }


  // add getter and setter
  public getAccount(): string {
    return this.account;
  }

  public setAccount(account: string): void {
    this.account = account;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): void {
    this.password = password;

  }

  public getLevel(): number {
    return this.level;
  }

  public setLevel(level: number): void {
    this.level = level;
  }

  public getExp(): number {
    return this.exp;
  }

  public setExp(exp: number): void {
    this.exp = exp;
  }

  public setMissionCarryOns(missionCarryOns: Array<MissionCarryOn>) {
    if (missionCarryOns) {
      this.missionCarryOns = missionCarryOns
    }
  }

  public setAdventurers(adventurers: Array<Adventurer>) {
    this.adventurers = adventurers
  }


}