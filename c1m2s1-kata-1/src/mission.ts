import { Challenge } from './challenge';
import { Scene } from './scene/scene';
import { lengthInRange } from './utils/length';
import { shouldBePositive } from './utils/validatior';
export class Mission {
  private _number: number;
  private _challenge: Challenge;
  private _name: string;
  private _scenes: Array<Scene>;
  
  
  constructor(
    number: number,
    name: string,
    challenge: Challenge,
    scenes: Array<Scene>
  ){
    this.number = number;
    this.name = name;
    this.challenge = challenge;
    this.scenes = scenes;
  }

  // 加總底下 scene 所有的經驗值
  public calculateExpAward():number{
    let sum = 0;
    this.scenes.forEach(scene => {
      sum += scene.calculateExpAward(); //多型
    });
    return sum
  }


  public get number(): number {
    return this._number;
  }
  public set number(value: number) {
    this._number = shouldBePositive(value);
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = lengthInRange(value,1,30);
  }
  public get challenge(): Challenge {
    return this._challenge;
  }
  public set challenge(value: Challenge) {
    if(value){
      this._challenge = value;
    }
  }

  public get scenes(): Array<Scene> {
    return this._scenes;
  }
  public set scenes(value: Array<Scene>) {
    if(value){
      this._scenes = value;
    }
  }
}