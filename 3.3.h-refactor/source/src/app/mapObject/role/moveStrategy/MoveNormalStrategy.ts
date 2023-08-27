import { EDirection } from "../../../enum/direction.enum";
import { MoveStrategy, MoveActionCommand } from "./moveStrategy";

export class MoveNormalStrategy extends MoveStrategy {
  printMoveableDirections() {
    console.log(`0=${EDirection.Up}`);
    console.log(`1=${EDirection.Down}`);
    console.log(`2=${EDirection.Left}`);
    console.log(`3=${EDirection.Right}`);
  }

  handleMove(action: MoveActionCommand) {
    if (action === "0") {
      this.role.move(EDirection.Up);
    } else if (action === "1") {
      this.role.move(EDirection.Down);
    } else if (action === "2") {
      this.role.move(EDirection.Left);
    } else if (action === "3") {
      this.role.move(EDirection.Right);
    } else {
      throw Error("不支援操作");
    }
  }
}
