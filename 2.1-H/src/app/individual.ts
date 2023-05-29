import { Coord } from './Coord';
import { Habit } from './habit';
import { MatchTypeStrategy } from './MatchTypeStrategy/MatchTypeStrategy';

export enum Gander {
  MALE,
  FEMALE,
}

export class Individual {
  private _id!: number;
  private _gander!: Gander.FEMALE | Gander.MALE;
  private _age!: number;
  private _intro!: string;
  private _habits!: Habit[];
  private _coord!: Coord;
  private _matchType!: MatchTypeStrategy;

  constructor(
    id: number,
    gander: Gander.FEMALE | Gander.MALE,
    age: number,
    intro: string,
    habits: Habit[],
    coord: Coord,
    matchType: MatchTypeStrategy
  ) {
    this.id = id;
    this.gander = gander;
    this.intro = intro;
    this.habits = habits;
    this.coord = coord;
    this.matchType = matchType;
  }

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    if (typeof value !== 'number') {
      throw Error('age must be number');
    }
    if (value <= 0) {
      throw Error('id must be greater than 0');
    }
    this._id = value;
  }

  public get gander(): Gander.FEMALE | Gander.MALE {
    return this._gander;
  }
  public set gander(value: Gander.FEMALE | Gander.MALE) {
    this._gander = value;
  }

  public get age(): number {
    return this._age;
  }
  public set age(value: number) {
    if (typeof value !== 'number') {
      throw Error('age must be number');
    }
    if (value >= 18) {
      throw Error('age must be less than 18');
    }
    this._age = value;
  }

  public get intro(): string {
    return this._intro;
  }
  public set intro(value: string) {
    if (typeof value !== 'string') {
      throw Error('intro must be string');
    }
    if (value.length > 200) {
      throw Error('intro must be less than 200');
    }
    this._intro = value;
  }

  public get habits(): Habit[] {
    return this._habits;
  }
  public set habits(value: Habit[]) {
    if (!Array.isArray(value)) {
      throw Error('habits must be array');
    }
    if (value.length > 10) {
      throw Error('habits must be less than 10');
    }
    this._habits = value;
  }

  public get coord(): Coord {
    return this._coord;
  }
  public set coord(value: Coord) {
    this._coord = value;
  }

  public get matchType(): MatchTypeStrategy {
    return this._matchType;
  }
  public set matchType(value: MatchTypeStrategy) {
    this._matchType = value;
  }
}
