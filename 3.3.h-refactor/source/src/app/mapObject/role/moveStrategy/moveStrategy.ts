import { EDirection } from "../../../enum/direction.enum";
import { Role } from "../role";

export type MoveActionCommand = "0" | "1" | "2" | "3";

export abstract class MoveStrategy {
  protected role: Role;
  constructor(role: Role) {
    this.role = role;
  }
  public abstract printMoveableDirections(): void;
  public abstract handleMove(action: MoveActionCommand): void;
}
