import { AirConditioner } from './airConditioner';
import { Fan } from './fan';
import rl from './helper/readline';
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

  async handlePress() {
    return new Promise((resolve, reject) => {
      rl.question('請輸入按鈕編號 0 1 2 3 4 5: ', (answer) => {
        resolve(this.press(parseInt(answer)));
      });
    });
  }

  press(button: number) {
    switch (button) {
      case 0:
        this.fan.nextLevel();
        break;
      case 1:
        this.fan.previousLevel();
        break;
      case 2:
        this.ac.turnOn();
        break;
      case 3:
        this.ac.turnOff();
        break;
      case 4:
        this.tv.turnOn();
        break;
      case 5:
        this.tv.turnOff();
        break;
    }
  }

  // press0() {
  //   this.fan.nextLevel();
  // }
  // press1() {
  //   this.fan.previousLevel();
  // }
  // press2() {
  //   this.ac.turnOn();
  // }
  // press3() {
  //   this.ac.turnOff();
  // }
  // press4() {
  //   this.tv.turnOn();
  // }
  // press5() {
  //   this.tv.turnOff();
  // }
}
