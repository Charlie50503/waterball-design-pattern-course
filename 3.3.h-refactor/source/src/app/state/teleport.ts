import { EState } from "../enum/state.enum";
import { Position } from "../position";
import { Normal } from "./normal";
import { State } from "./state";

export class Teleport extends State {
  public getName(): string {
    return "瞬身";
  }

  protected getDurationRound(): number {
    return 1;
  }

  public getType(): EState {
    return EState.Teleport;
  }

  public override onRoundEnd() {
    this.roundCount++;
    if (this.roundCount >= this.getDurationRound()) {
      //角色的位置將被隨機移動至任一空地
      const map = this.role.getMap(); // 假設有一個方法能取得地圖
      const mapRowSize = map.getRowSize();
      const mapColumnSize = map.getColumnSize();

      let nextPosition: Position | null = null;
      do {
        nextPosition = new Position(
          Math.floor(Math.random() * mapColumnSize),
          Math.floor(Math.random() * mapRowSize)
        );
      } while (map.isPositionOccupied(nextPosition)); // 確保新位置是空地

      this.role.updatePosition(nextPosition, this.role.getDirection());
      // 更新角色位置
      console.log(
        `${this.role.getName()}瞬身至位置 (${nextPosition.getRow()}, ${nextPosition.getColumn()})`
      );
      this.role.setState(new Normal(this.role));
    }
  }
}
