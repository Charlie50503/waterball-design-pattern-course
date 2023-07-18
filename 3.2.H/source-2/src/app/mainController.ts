import { Command } from './commands/baseCommand';
import { ReadlineService } from './commons/readline.service';
import { Stack } from './commons/stack';
import { stringToNumberOfAry } from './commons/untils';
import { Keyboard } from './types/keyborad.enum';
import { MainControllerPrintService } from './mainControllerPrint.service';
import { ShortcutCollection } from './shortcutCollection';
import { EConfirm } from './types/confirm.enum';
import { userInputOperation } from './types/userInput.type';
import { MainControllerValidation } from './mainController.validation';

export class MainController {
  private readonly _commands: Command[] = [];
  private _shortcutCollections: ShortcutCollection[] = [];
  private readonly s1 = new Stack<ShortcutCollection>();
  private readonly s2 = new Stack<ShortcutCollection>();

  private _readlineService: ReadlineService;
  private _mainControllerValidation: MainControllerValidation;
  private _mainControllerPrintService: MainControllerPrintService;

  constructor() {
    this._readlineService = new ReadlineService();
    this._mainControllerValidation = new MainControllerValidation();
    this._mainControllerPrintService = new MainControllerPrintService();
  }

  public async start() {
    while (true) {
      const operation = await this._readlineService.getValidUserInput(
        '(1) 快捷鍵設置 (2) Undo (3) Redo (字母) 按下按鍵:',
        this._mainControllerValidation.isValidOperation
      );
      await this.handleOperation(operation as userInputOperation);
      this._mainControllerPrintService.printAllShortcutCommands(
        this._shortcutCollections
      );
    }
  }

  async handleOperation(operation: userInputOperation) {
    switch (operation) {
      case '1':
        await this.setShortcut();
        break;
      case '2':
        this.undo();
        break;
      case '3':
        this.redo();
        break;
      default:
        this.press(operation);
    }
  }

  private async setShortcut(): Promise<void> {
    const isSetMacroStr = await this._readlineService.getValidUserInput(
      '設置巨集指令 (y/n)：',
      this._mainControllerValidation.isValidConfirmOperation
    );
    const isSetMacro = isSetMacroStr.toUpperCase();
    if (isSetMacro === EConfirm.Y) {
      await this.setShortcutMacro();
    } else {
      await this.setShortcutCommand();
    }
  }

  private async setShortcutCommand() {
    const key = (await this._readlineService.getValidUserInput(
      'Key: ',
      this._mainControllerValidation.isValidKeyboardOperation
    )) as Keyboard;

    this._mainControllerPrintService.printSetShortcutCommandInfoMessage(key);
    this._mainControllerPrintService.printAllCommands(this._commands);
    const commandIndex = (await this._readlineService.getValidUserInput(
      '輸入行為: ',
      this._mainControllerValidation.isValidCommandIndex,
      this._commands
    ));
    this.setCommandCollectionKey(key as Keyboard);
    const command = this._commands[+commandIndex];
    this.setShortcutCollectionCommand(key, [command]);
  }

  private async setShortcutMacro() {
    const key = (await this._readlineService.getValidUserInput(
      'Key: ',
      this._mainControllerValidation.isValidKeyboardOperation
    )) as Keyboard;

    this._mainControllerPrintService.printSetShortcutMacroInfoMessage(key);
    this._mainControllerPrintService.printAllCommands(this._commands);
    const selectCommandsStr = (await this._readlineService.getValidUserInput(
      '輸入行為: ',
      this._mainControllerValidation.isValidCommandsIndex,
      this._commands
    ));
    this.setCommandCollectionKey(key);
    const commands: Command[] = [];
    const selectCommands = stringToNumberOfAry(selectCommandsStr);
    selectCommands.forEach((index) => {
      commands.push(this._commands[index]);
    });
    this.setShortcutCollectionCommand(key, commands);
  }

  private press(key: Keyboard) {
    const shortcutCollection = this._shortcutCollections.find(
      (shortcutCollection) => {
        return shortcutCollection.key === key;
      }
    );
    if (shortcutCollection && shortcutCollection.commands) {
      shortcutCollection.commands?.forEach((command) => {
        command.execute();
      });
      this.s1.push(shortcutCollection);
      this.s2.clear();
    } else {
      console.error('沒找到按鍵功能');
    }
  }

  private redo() {
    const previousShortcutCollection = this.s2.pop();
    if (previousShortcutCollection?.commands) {
      previousShortcutCollection.commands?.forEach((command) => {
        command.execute();
      });
      this.s1.push(previousShortcutCollection);
    } else {
      console.log('沒有指令可以執行');
    }
  }

  private undo() {
    const previousShortcutCollection = this.s1.pop();
    if (previousShortcutCollection?.commands) {
      previousShortcutCollection.commands?.forEach((command) => {
        command.undo();
      });
      this.s2.push(previousShortcutCollection);
    } else {
      console.log('沒有指令可以執行');
    }
  }

  public reset() {
    this._shortcutCollections = [];
    console.log('指令已經全部重置');
  }

  public setCommand(command: Command) {
    this._commands.push(command);
  }

  private setCommandCollectionKey(key: Keyboard) {
    if (
      this._shortcutCollections.find(
        (shortcutCollection) => shortcutCollection.key === key
      )
    ) {
      console.log('按鍵已被占用');
    }
    this._shortcutCollections.push(new ShortcutCollection(key));
  }

  private setShortcutCollectionCommand(key: Keyboard, commands: Command[]) {
    const shortcutCollection = this._shortcutCollections.find(
      (shortcutCollection) => shortcutCollection.key === key
    );
    if (!shortcutCollection) {
      console.log('沒找到可以對應的按鍵');
    } else {
      shortcutCollection.commands = commands;
    }
  }
}
