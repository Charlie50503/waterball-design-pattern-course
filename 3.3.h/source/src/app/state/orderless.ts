import {
  MoveLeftRightStrategy,
  MoveUpDownStrategy,
} from '../mapObject/moveStrategy';
import { State } from './state';
import { EState } from './state.enum';

export class Orderless extends State {
  public getName(): string {
    return '混亂';
  }

  public getDurationRound(): number {
    return 3;
  }

  public getType(): EState {
    return EState.Orderless;
  }

  public async onMove(): Promise<void> {
    const moveStrategy = this.randomMoveStrategy();
    await this.role.handleMove(moveStrategy);
  }

  private randomMoveStrategy() {
    const rand = Math.floor(Math.random() * 2); // 生成 0 到 3 之間的隨機數字
    switch (rand) {
      case 0:
        return new MoveLeftRightStrategy(this.role);
      case 1:
        return new MoveUpDownStrategy(this.role);
      default:
        throw Error('不支援操作');
    }
  }
}
