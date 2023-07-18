import { Command } from './commands/baseCommand';
import { Keyboard } from './types/keyborad.enum';
import { ShortcutCollection } from './shortcutCollection';

export class MainControllerPrintService {
  public printAllShortcutCommands(shortcutCollections: ShortcutCollection[]) {
    shortcutCollections.forEach((shortcutCollection) => {
      let str = `${shortcutCollection.key}: `;
      shortcutCollection.commands?.forEach((command) => {
        str += ` ${command.getName()} &`;
      });
      str = str.slice(0, str.length - 1);
      console.log(str);
    });
  }

  public printAllCommands(commands: Command[]) {
    commands.forEach((command, index) => {
      console.log(`(${index}) ${command.getName()}`);
    });
  }

  public printSetShortcutCommandInfoMessage(key: Keyboard) {
    console.log(`要將哪一道指令設置到快捷鍵 ${key} 上: `);
  }

  public printSetShortcutMacroInfoMessage(key: Keyboard) {
    console.log(`要將哪些指令設置成快捷鍵 ${key} 的巨集（輸入多個數字，以空白隔開）: `);
  }
}
