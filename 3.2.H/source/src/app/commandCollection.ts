import { Command } from "./commands/baseCommand";
import { Keyboard } from "./keyborad";

export class CommandCollection {
  key: Keyboard;
  commands:Command[] | null = null;

  constructor(key: Keyboard){
    this.key = key
  }
}