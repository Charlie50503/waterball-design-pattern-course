import { AirConditioner } from '../airConditioner';
import { Fan } from './fan';
import rl from '../helper/readline';
import { Television } from './television';
import { Command } from '../commands/command';
import { Stack } from '../commands/stack';

export class Controller {
  private readonly _commands: Command[] = [];
  private readonly s1 = new Stack<Command>();
  private readonly s2 = new Stack<Command>();

  setCommand(button: number, command: Command) {
    this._commands[button] = command;
  }

  async handlePress() {
    return new Promise((resolve, reject) => {
      rl.question('Click a button (0~5) or undo (-1) or redo (-2): ', (answer) => {
        if (answer === '-1') {
          this.undo();
        } else if (answer === '-2') {
          this.redo();
        } else {
          this.press(parseInt(answer));
        }
        resolve('');
      });
    });
  }

  press(button: number) {
    if (button >= 0 && button < this._commands.length) {
      this._commands[button].execute();
      this.s1.push(this._commands[button]);
      this.s2.clear();
    } else {
      console.log('輸入錯誤');
    }
  }

  redo() {
    const previousCommand = this.s1.pop();
    if (previousCommand) {
      previousCommand.execute();
      this.s1.push(previousCommand);
    }
  }

  undo() {
    const previousCommand = this.s1.pop();
    if (previousCommand) {
      previousCommand.undo();
      this.s2.push(previousCommand);
    }
  }
}
