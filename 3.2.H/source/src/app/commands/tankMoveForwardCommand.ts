import { Tank } from "../tank";
import { Command } from "./baseCommand";

export class TankMoveForwardCommand extends Command {
  private readonly _tank:Tank;
  constructor(tank:Tank){
    super();
    this._tank = tank;
  }

  public getName(): string {
    return "MoveTankForward";
  }

  public execute(): void {
    this._tank.moveForward();
  }

  public undo(): void {
    this._tank.moveBackward();
  }
}