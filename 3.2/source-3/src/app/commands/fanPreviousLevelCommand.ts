import { Fan } from "../commons/fan";
import { Command } from "./command";

export class FanPreviousLevelCommand implements Command {
  private readonly _fan:Fan;

  constructor(fan: Fan) {
    this._fan = fan;
  }
  execute(): void {
    this._fan.previousLevel();
  }

  undo(): void {
    this._fan.nextLevel();
  }
}