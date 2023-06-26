import { Coord } from "../coord";

export enum SpriteType {
  Fire,
  Water,
  Hero,
  Null
}

export class Sprite {
  type!: SpriteType;
  coord!: Coord;

  constructor() { }

  setCoord(x:number){
    this.coord = new Coord(x)
  }
}