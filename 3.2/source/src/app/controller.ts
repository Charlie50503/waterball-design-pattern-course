import { AirConditioner } from './airConditioner';
import { Fan } from './fan';
import { Television } from './television';

export class Controller {
  ac: AirConditioner;
  fan: Fan;
  tv: Television;

  constructor(ac: AirConditioner, fan: Fan, tv: Television) {
    this.ac = ac;
    this.fan = fan;
    this.tv = tv;
  }

  press0() {
    this.fan.nextLevel();
  }
  press1() {
    this.fan.previousLevel();
  }
  press2() {
    this.ac.turnOn();
  }
  press3() {
    this.ac.turnOff();
  }
  press4() {
    this.tv.turnOn();
  }
  press5() {
    this.tv.turnOff();
  }
}
