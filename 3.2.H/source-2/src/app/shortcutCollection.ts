import { Command } from "./commands/baseCommand";
import { Keyboard } from "./types/keyborad.enum";

export class ShortcutCollection {
  key:Keyboard;
  commands:Command[] | null = null;

  constructor(key: Keyboard){
    this.key = key
  }
}