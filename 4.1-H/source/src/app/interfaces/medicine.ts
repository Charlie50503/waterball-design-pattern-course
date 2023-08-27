export class Medicine {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  public setName(name: string) {
    this._name = name;
  }

  public getName() {
    return this._name;
  }
}
