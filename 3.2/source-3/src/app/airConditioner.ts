export class AirConditioner {
  private _on: boolean = false;


  isOn(): boolean {
    return this._on
  }

  turnOn() {
    console.log('【 AC 】Turned ON.');
    this._on = true;
  }

  turnOff() {
    console.log('【 AC 】Turned OFF.');
    this._on = false;
  }
}
