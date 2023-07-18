import { MainController } from '../mainController';
import { Command } from './baseCommand';

export class MainControlKeyboardResetCommand extends Command {
  mainController: MainController;
  constructor(mainController: MainController) {
    super();
    this.mainController = mainController;
  }

  getName(): string {
    return 'ResetMainControlKeyboard';
  }

  execute(): void {
    this.mainController.resetShortKey();
  }

  undo(): void {}
}
