import { expand, map, Observable, of, Subject, tap } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { CommandCollection } from './commandCollection';
import { Command } from './commands/baseCommand';
import { Stack } from './commons/stack';
import rl from './helper/readline';
import { Keyboard } from './keyborad';

export type CLIOperation = '1' | '2' | '3';

export class MainController {
  private readonly _commands: Command[] = [];
  private _commandCollections: CommandCollection[] = [];
  private readonly s1 = new Stack<CommandCollection>();
  private readonly s2 = new Stack<CommandCollection>();

  private handlePressSubject = new Subject<Keyboard | CLIOperation>();
  private handlePress$ = this.handlePressSubject.asObservable();
  private undo$ = this.handlePress$.pipe(filter((answer) => answer === '2'));
  private redo$ = this.handlePress$.pipe(filter((answer) => answer === '3'));
  private setShortcutCommand$ = this.handlePress$.pipe(
    filter((answer) => answer === '1')
  );
  private handleInputKey$ = this.handleInputKey().pipe(
    tap((key) => {
      // print selection
      console.log(`要將哪一道指令設置到快捷鍵 ${key} 上: `);
      this.printCommands();
      this.setCommandCollectionKey(key);
    }),
    switchMap((key) => {
      return this.handleSetCommand().pipe(
        map((index) => {
          return {
            key: key,
            index: index,
          };
        })
      );
    })
  );

  private executeCommand$ = this.handlePress$.pipe(
    filter((answer) => /^[a-zA-Z]$/.test(answer))
  );

  constructor(commands: Command[]) {
    this._commands = commands;
  }

  public start() {
    this.handlePress();
    this.setShortcutCommand$
      .pipe(
        switchMap((res) => {
          return this.handleInputKey$;
        })
      )
      .subscribe({
        next: ({ key, index }) => {
          // set shortcut command
          const command = this._commands[index];
          this.setCommandCollectionCommand(key, command);
          this.printListOfShortcutKeyCommand();
          this.handlePress();
        },
        error: (error) => {
          console.log(error);
        },
      });
    this.undo$.subscribe({
      next: () => {
        this.undo();
        this.printListOfShortcutKeyCommand();
        this.handlePress();
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.redo$.subscribe({
      next: () => {
        this.redo();
        this.printListOfShortcutKeyCommand();
        this.handlePress();
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.executeCommand$.subscribe({
      next: (key) => {
        const upperKey = key.toUpperCase();
        this.press(upperKey as Keyboard);
        this.printListOfShortcutKeyCommand();
        this.handlePress();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private setCommandCollectionKey(key: Keyboard) {
    if (
      this._commandCollections.find(
        (commandCollection) => commandCollection.key === key
      )
    ) {
      console.log('按鍵已被占用');
    } else {
      this._commandCollections.push(new CommandCollection(key));
    }
  }

  private setCommandCollectionCommand(key: Keyboard, command: Command) {
    const commandCollection = this._commandCollections.find(
      (commandCollection) => commandCollection.key === key
    );
    if (!commandCollection) {
      console.log('沒找到可以對應的按鍵');
    } else {
      commandCollection.command = command;
    }
  }

  private handlePress() {
    rl.question(
      '(1) 快捷鍵設置 (2) Undo (3) Redo (字母) 按下按鍵:',
      (answer: string) => {
        if (/^[1-3]$/.test(answer)) {
          console.log(typeof answer);
          this.handlePressSubject.next(answer as CLIOperation);
        } else if (/^[a-zA-Z]$/.test(answer)) {
          this.handlePressSubject.next(answer as Keyboard);
        } else {
          this.handlePressSubject.error('不支援的操作');
        }
      }
    );
  }

  private press(key: Keyboard) {
    const commandCollection = this._commandCollections.find(
      (commandCollection) => {
        return commandCollection.key === key;
      }
    );
    if (commandCollection && commandCollection.command) {
      commandCollection?.command?.execute();
      this.s1.push(commandCollection);
      this.s2.clear();
    } else {
      console.error('沒找到按鍵功能');
    }
  }

  private handleInputKey() {
    return new Observable<Keyboard>((observer) => {
      rl.question('Key:', (answer: string) => {
        if (/^[a-zA-Z]{1}$/.test(answer)) {
          const upperAnswer = answer.toUpperCase();
          observer.next(upperAnswer as Keyboard);
        } else {
          observer.error('不支援的按鍵');
        }
      });
    });
  }

  private handleSetCommand() {
    return new Observable<number>((observer) => {
      rl.question('', (answer: string) => {
        if (isNaN(Number(answer))) {
          observer.error('不支援的按鍵');
        }
        const index = Number(answer);
        if (index >= this._commands.length) {
          observer.error('不支援的數字');
        }
        observer.next(index);
      });
    });
  }

  private printCommands() {
    this._commands.forEach((command, index) => {
      console.log(`(${index}) ${command.getName()}`);
    });
  }

  private redo() {
    const previousCommandCollection = this.s2.pop();
    if (previousCommandCollection?.command) {
      previousCommandCollection?.command.execute();
      this.s1.push(previousCommandCollection);
    }else{
      console.log("沒有指令可以執行");
    }
  }

  private undo() {
    const previousCommandCollection = this.s1.pop();
    if (previousCommandCollection?.command) {
      previousCommandCollection?.command.undo();
      this.s2.push(previousCommandCollection);
    }else{
      console.log("沒有指令可以執行");
    }
  }

  private printListOfShortcutKeyCommand() {
    this._commandCollections.forEach((commandCollection) => {
      console.log(
        `${commandCollection.key}: ${commandCollection.command?.getName()}`
      );
    });
  }

  //TODO 少一個reset
}
