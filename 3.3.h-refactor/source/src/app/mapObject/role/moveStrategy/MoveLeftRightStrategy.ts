import { EDirection } from "../../../enum/direction.enum";
import { MoveStrategy, MoveActionCommand } from "./moveStrategy";

export class MoveLeftRightStrategy extends MoveStrategy {
  printMoveableDirections() {
    console.log(`0=${EDirection.Left}`);
    console.log(`1=${EDirection.Right}`);
  }

  handleMove(action: MoveActionCommand) {
    if (action === "0") {
      this.role.move(EDirection.Left);
    } else if (action === "1") {
      this.role.move(EDirection.Right);
    } else {
      throw Error("不支援操作");
    }
  }
}
