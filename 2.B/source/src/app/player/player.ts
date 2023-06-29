import { Hand } from '../hand';
import { Play } from '../play/play';

export abstract class Player {
  public hand!: Hand;
  public name!: string;
  public abstract playAction: Play;
  private _id: number;

  constructor(id: number) {
    this._id = id;
  }

  nameHimself(name: string) {
    this.name = name;
  }

  play() {
    this.playAction.play();
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
}
