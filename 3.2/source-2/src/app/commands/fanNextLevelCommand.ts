import { Fan } from "../commons/fan";
import { Command } from "./command";

export class FanNextLevelCommand implements Command {
  private readonly _fan:Fan;

  constructor(fan: Fan) {
    this._fan = fan;
  }
  execute(): void {
    this._fan.nextLevel();
  }
}