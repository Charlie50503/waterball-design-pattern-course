import { Television } from "../commons/television";
import { Command } from "./command";

export class TurnOffTvCommand implements Command {
  private readonly _tv:Television;

  constructor(tv: Television) {
    this._tv = tv;
  }
  execute(): void {
    this._tv.turnOff();
  }
}