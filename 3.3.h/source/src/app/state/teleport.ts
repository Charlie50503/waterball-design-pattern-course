import { Position } from '../position';
import { NormalState } from './normalState';
import { State } from './state';
import { EState } from './state.enum';

export class Teleport extends State {
  public getName(): string {
    return '瞬身';
  }

  public getDurationRound(): number {
    return 1;
  }
  public override onRoundEnd(): void {
    this.addCurrentDurationRoundCount();
    if (this.isDurationRoundEnd()) {
      //角色的位置將被隨機移動至任一空地
      const map = this.role.getMap(); // 假設有一個方法能取得地圖
      const mapHeight = map.getHeight();
      const mapWidth = map.getWidth();

      let position: Position | null = null;
      do {
        position = new Position(
          Math.floor(Math.random() * mapWidth),
          Math.floor(Math.random() * mapHeight)
        );
      } while (!map.isPositionEmpty(position)); // 確保新位置是空地

      // 更新角色位置
      this.role.setPosition(position.x, position.y);

      console.log(`角色瞬身至位置 (${position.x}, ${position.y})`);
      this.role.setState(new NormalState(this.role));
    }
  }

  public getType(): EState {
    return EState.Teleport;
  }
}
