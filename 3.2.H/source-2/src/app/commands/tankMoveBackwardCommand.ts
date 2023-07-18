import { Tank } from "../tank";
import { Command } from "./baseCommand";

export class TankMoveBackwardCommand extends Command {
  private readonly _tank:Tank;

  constructor(tank:Tank){
    super();
    this._tank = tank;
  }

  public getName(): string {
    return "MoveTankBackward";
  }

  public execute(): void {
    this._tank.moveBackward();
  }

  public undo(): void {
    this._tank.moveForward();
  }
}