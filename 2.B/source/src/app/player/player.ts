import { Hand } from '../hand';
import rl from '../helper/helper';
import { Play, PlayResult } from '../play/play';
import { Round } from '../round';

export abstract class Player {
  public hand: Hand;
  public name!: string;
  public playAction: Play;
  private _id: number;

  isPass = false;

  constructor(id: number, playAction: Play) {
    this._id = id;
    this.playAction = playAction;
    this.hand = new Hand();
  }

  nameHimself(): Promise<string> {
    // cli 輸入名稱
    return new Promise((resolve, reject) => {
      rl.question('請輸入名字\n', (name) => {
        resolve(name);
      });
    });
  }

  async nameHimselfHandler() {
    this.name = await this.nameHimself();
  }

  async play(round: Round, isFirstPlay:boolean): Promise<PlayResult> {
    return await this.playAction.play(this, round, isFirstPlay);
  }

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    if (value > 4 || value < 0) {
      throw Error('id must be between 0 and 4');
    }
    this._id = value;
  }


  public resetPass(){
    this.isPass=false;
  }

  public isPassed(){
    return this.isPass;
  }

  public pass(){
    this.isPass=true;
  }
}
