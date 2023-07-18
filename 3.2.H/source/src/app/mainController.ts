import { map, merge, mergeMap, Observable, share, Subject, tap } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { CommandCollection } from './commandCollection';
import { Command } from './commands/baseCommand';
import { Stack } from './commons/stack';
import rl from './helper/readline';
import { Keyboard } from './keyborad';
import { FailResult, Result, SuccessResult } from './result';

export type CLIOperation = '1' | '2' | '3';

export enum ConfirmType {
  Y = 'Y',
  N = 'N',
}

export class MainController {
  private readonly _commands: Command[] = [];
  private _commandCollections: CommandCollection[] = [];
  private readonly s1 = new Stack<CommandCollection>();
  private readonly s2 = new Stack<CommandCollection>();
  private handlePressSubject = new Subject<
    Result<Keyboard | CLIOperation | null>
  >();
  private handlePress$ = this.handlePressSubject.pipe(
    filter((result) => result.isSuccess),
    map((result) => result.data as Keyboard | CLIOperation)
  );
  private handlePressError$ = this.handlePressSubject.pipe(
    filter((result) => !result.isSuccess),
    map((result) => result.message)
  );

  private handleSetCommand$ = this.handleSetCommand().pipe(
    filter((result) => result.isSuccess),
    map((result) => result.data as number)
  );

  private handleSetCommands$ = this.handleSetCommands().pipe(
    filter((result) => result.isSuccess),
    map((result) => result.data as number[])
  );

  private handleSetCommandError$ = this.handleSetCommand().pipe(
    filter((result) => !result.isSuccess),
    map((result) => result.message)
  );

  private handleInputShortKey$ = this.handleInputKey().pipe(
    filter((result) => result.isSuccess),
    map((result) => result.data),
    tap((key) => {
      // print selection
      console.log(`要將哪一道指令設置到快捷鍵 ${key} 上: `);
      this.printCommands();
      this.setCommandCollectionKey(key as Keyboard);
    })
  );

  private setShortcut$ = this.handlePress$.pipe(
    filter((answer) => answer === '1'),
    switchMap((res) => this.handleIsUseMacro()),
    share() // 共享源 observable 讓 observable 只執行一次, 原先是單播, 使用 shared 之後可以變成多播(multicast)
  );

  private setShortcutMacro$ = this.setShortcut$.pipe(
    filter((result) => result.isSuccess && result.data === ConfirmType.Y),
    switchMap((res) => this.handleInputShortKey$),
    switchMap((key) => {
      return this.handleSetCommands$.pipe(
        map((numberAry) => {
          return {
            key: key as Keyboard,
            numberAry: numberAry,
          };
        })
      );
    })
  );
  private setShortcutCommand$ = this.setShortcut$.pipe(
    filter((result) => result.isSuccess && result.data === ConfirmType.N),
    switchMap((res) => this.handleInputShortKey$),
    switchMap((key) =>
      this.handleSetCommand$.pipe(
        map((index) => {
          return {
            key: key as Keyboard,
            index: index as number,
          };
        })
      )
    )
  );
  private undo$ = this.handlePress$.pipe(filter((answer) => answer === '2'));
  private redo$ = this.handlePress$.pipe(filter((answer) => answer === '3'));

  private handleInputKeyError$ = this.handleInputKey().pipe(
    filter((result) => !result.isSuccess),
    map((result) => result.message)
  );

  private errorMerge$ = merge(
    this.handleInputKeyError$,
    this.handlePressError$,
    this.handleSetCommandError$
  );

  private executeCommand$ = this.handlePress$.pipe(
    filter((answer) => /^[a-zA-Z]$/.test(answer))
  );

  constructor() {
  }

  public setCommand(command:Command){
    this._commands.push(command);
  }

  public start() {
    this.handlePress();

    this.setShortcutCommand$.subscribe({
      next: ({ key, index }) => {
        // set shortcut command
        const command = this._commands[index];
        this.setCommandCollectionCommand(key, [command]);
        this.printListOfShortcutKeyCommand();
        this.handlePress();
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.setShortcutMacro$.subscribe({
      next: ({ key, numberAry }) => {
        const commands:Command[] = [];
        numberAry.forEach((index) => {
          commands.push(this._commands[index]);
        });
        this.setCommandCollectionCommand(key, commands);
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

    this.errorMerge$.subscribe({
      next: (error) => {
        console.error(error);
        this.handlePress();
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

  private setCommandCollectionCommand(key: Keyboard, commands: Command[]) {
    const commandCollection = this._commandCollections.find(
      (commandCollection) => commandCollection.key === key
    );
    if (!commandCollection) {
      console.log('沒找到可以對應的按鍵');
    } else {
      commandCollection.commands = commands;
    }
  }

  private handlePress() {
    rl.question(
      '(1) 快捷鍵設置 (2) Undo (3) Redo (字母) 按下按鍵:',
      (answer: string) => {
        if (/^[1-3]$/.test(answer)) {
          const result = new SuccessResult<CLIOperation>(
            answer as CLIOperation
          );
          this.handlePressSubject.next(result);
        } else if (/^[a-zA-Z]$/.test(answer)) {
          const result = new SuccessResult<Keyboard>(answer as Keyboard);
          this.handlePressSubject.next(result);
        } else {
          const result = new FailResult('不支援的操作');
          this.handlePressSubject.next(result);
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
    if (commandCollection && commandCollection.commands) {
      commandCollection.commands?.forEach((command) => {
        command.execute();
      })
      this.s1.push(commandCollection);
      this.s2.clear();
    } else {
      console.error('沒找到按鍵功能');
    }
  }

  private handleIsUseMacro() {
    return new Observable<Result<ConfirmType | null>>((observer) => {
      rl.question('設置巨集指令 (y/n)：', (answer: string) => {
        if (/^[yYnN]{1}$/.test(answer)) {
          const upperAnswer = answer.toUpperCase();
          const result = new SuccessResult<ConfirmType>(
            upperAnswer as ConfirmType
          );
          observer.next(result);
        } else {
          const result = new FailResult('不支援的按鍵');
          observer.next(result);
        }
      });
    });
  }

  private handleInputKey() {
    return new Observable<Result<Keyboard | null>>((observer) => {
      rl.question('Key:', (answer: string) => {
        if (/^[a-zA-Z]{1}$/.test(answer)) {
          const upperAnswer = answer.toUpperCase();
          const result = new SuccessResult<Keyboard>(upperAnswer as Keyboard);
          observer.next(result);
        } else {
          const result = new FailResult('不支援的按鍵');
          observer.next(result);
        }
      });
    });
  }

  private handleSetCommands() {
    return new Observable<Result<number[] | null>>((observer) => {
      rl.question('', (answer: string) => {
        const ary = answer.split(' '); // 0 1 2
        if (ary.every((item) => !isNaN(Number(answer)))) {
          const result = new FailResult('不支援的按鍵');
          observer.next(result);
        }

        const numberAry = ary.map((item) => Number(item));
        if (numberAry.some((number) => number >= this._commands.length)) {
          const result = new FailResult('不支援的數字');
          observer.next(result);
        }

        const result = new SuccessResult<number[]>(numberAry);
        observer.next(result);
      });
    });
  }

  private handleSetCommand() {
    return new Observable<Result<number | null>>((observer) => {
      rl.question('', (answer: string) => {
        if (isNaN(Number(answer))) {
          const result = new FailResult('不支援的按鍵');
          observer.next(result);
        }
        const index = Number(answer);
        if (index >= this._commands.length) {
          const result = new FailResult('不支援的數字');
          observer.next(result);
        }
        const result = new SuccessResult<number>(index);
        observer.next(result);
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
    if (previousCommandCollection?.commands) {
      previousCommandCollection.commands?.forEach((command) => {
        command.execute();
      })
      this.s1.push(previousCommandCollection);
    } else {
      console.log('沒有指令可以執行');
    }
  }

  private undo() {
    const previousCommandCollection = this.s1.pop();
    if (previousCommandCollection?.commands) {
      previousCommandCollection.commands?.forEach((command) => {
        command.undo();
      })
      this.s2.push(previousCommandCollection);
    } else {
      console.log('沒有指令可以執行');
    }
  }

  private printListOfShortcutKeyCommand() {
    this._commandCollections.forEach((commandCollection) => {
      commandCollection.commands?.forEach((command) => {
        console.log(
          `${commandCollection.key}: ${command.getName()}`
        );
      })

    });
  }

  public resetShortKey() {
    this._commandCollections = [];
    console.log('指令已經全部重置');
  }
}
