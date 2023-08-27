export class PotentialDisease {
  private _name!: string;
  constructor(name: string) {
    this.setName(name);
  }

  setName(name: string) {
    // 正確範圍 8~100
    if (name.length < 8 || name.length > 100) {
      throw new Error('輸入疾病名稱長度錯誤');
    }
    this._name = name;
  }

  getName() {
    return this._name;
  }
}
