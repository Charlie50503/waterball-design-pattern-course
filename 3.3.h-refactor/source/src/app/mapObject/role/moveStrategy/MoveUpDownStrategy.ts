import { EDirection } from "../../../enum/direction.enum";
import { MoveStrategy, MoveActionCommand } from "./moveStrategy";

export class MoveUpDownStrategy extends MoveStrategy {
  printMoveableDirections() {
    console.log(`0=${EDirection.Up}`);
    console.log(`1=${EDirection.Down}`);
  }

  handleMove(action: MoveActionCommand) {
    if (action === "0") {
      this.role.move(EDirection.Up);
    } else if (action === "1") {
      this.role.move(EDirection.Down);
    } else {
      throw Error("不支援操作");
    }
  }
}
