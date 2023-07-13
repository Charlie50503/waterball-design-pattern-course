export class Television {
  _on: boolean = false;

  isOn(): boolean {
    return this._on;
  }

  turnOn() {
    this._on = true;
    console.log('【 TV 】Turned ON.');
  }
  turnOff() {
    this._on = false;
    console.log('【 TV 】Turned OFF.');
  }
}
