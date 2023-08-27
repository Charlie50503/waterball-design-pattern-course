// 症狀
export class Symptom{
  private _description : string

  constructor(description : string){
    this._description = description
  }

  public getDescription(){
    return this._description
  }

  public isSame(symptom : Symptom){
    return this._description === symptom.getDescription()
  }
}