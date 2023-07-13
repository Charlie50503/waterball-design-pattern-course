import { AirConditioner } from "../airConditioner";
import { Command } from "./command";

export class TurnOnAirConditionerCommand implements Command {
  private readonly _ac:AirConditioner;

  constructor(ac: AirConditioner) {
    this._ac = ac;
  }
  execute(): void {
    this._ac.turnOn();
  }
}