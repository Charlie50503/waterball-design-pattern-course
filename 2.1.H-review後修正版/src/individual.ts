import { Coord } from "./coord";

export enum Gander {
  MALE,
  FEMALE,
}

export class Individual {

  private _id!: number;
  private _name!: string;

  private _gander!: Gander.FEMALE | Gander.MALE;
  private _age!: number;
  private _intro!: string;
  private _habits!: string[];

  private _coord!: Coord;

  constructor(
    id: number,
    name: string,
    gander: Gander.FEMALE | Gander.MALE,
    age: number,
    intro: string,
    habits: string[],
    coord: Coord,
  ) {
    this.id = id;
    this.name = name;
    this.gander = gander;
    this.age = age;
    this.intro = intro;
    this.habits = habits;
    this.coord = coord;
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

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
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
    if (value < 18) {
      throw Error('age must be greater than 17');
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

  public get habits(): string[] {
    return this._habits;
  }
  public set habits(value: string[]) {
    if(value.length > 10 ){
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
}
