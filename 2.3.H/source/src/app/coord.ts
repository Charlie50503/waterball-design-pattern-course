export class Coord {
  private _x!: number;

  constructor(x: number) {
    this._x = x;
  }

  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    if(value < 0 || value > 29) {
      throw new Error('x must be between 0 and 29');
    }
    this._x = value;
  }

  
}