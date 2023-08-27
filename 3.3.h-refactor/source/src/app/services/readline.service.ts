import * as readline from "readline";

export class ReadlineService {
  private readlineInterface: readline.Interface;

  constructor() {
    this.readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public getUserInput(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.readlineInterface.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  }

  public async getValidUserInput(
    prompt: string,
    validationFunction: (...args: any[]) => boolean,
    ...args: any[]
  ): Promise<string> {
    let userInput = await this.getUserInput(prompt);
    while (!validationFunction(userInput, ...args)) {
      console.log("不支援的操作");
      userInput = await this.getUserInput(prompt);
    }
    return userInput;
  }
}

export const readlineService = new ReadlineService();
