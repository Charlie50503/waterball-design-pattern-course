import { AirConditioner } from '../airConditioner';
import { Fan } from './fan';
import rl from '../helper/readline';
import { Television } from './television';
import { Command } from '../commands/command';

export class Controller {
  private readonly _commands: Command[] = [];


  setCommand(button: number, command: Command) {
    this._commands[button] = command;
  }

  async handlePress() {
    return new Promise((resolve, reject) => {
      rl.question('請輸入按鈕編號 0 1 2 3 4 5: ', (answer) => {
        resolve(this.press(parseInt(answer)));
      });
    });
  }

  press(button: number) {
    this._commands[button].execute();
  }
}
