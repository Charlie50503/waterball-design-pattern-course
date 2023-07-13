export class Fan {
  private _level: number = 0; // 0,1,2,3

  getLevel(): number {
    return this._level;
  }

  nextLevel() {
    this._level = (this._level + 1) % 4;
    console.log('【 Fan 】Level -> ' + this._level);
  }

  previousLevel() {
    const prevLevel = this._level - 1;
    this._level = prevLevel === -1 ? 3 : prevLevel;
    console.log('【 Fan 】Level -> ' + this._level);
  }
}
