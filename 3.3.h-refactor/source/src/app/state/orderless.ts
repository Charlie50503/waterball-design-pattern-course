import { EState } from "../enum/state.enum";
import { MoveLeftRightStrategy } from "../mapObject/role/moveStrategy/MoveLeftRightStrategy";
import { MoveUpDownStrategy } from "../mapObject/role/moveStrategy/MoveUpDownStrategy";
import { State } from "./state";

export class Orderless extends State {
  public getName(): string {
    return "混亂";
  }

  public onRoundStart(): void {}

  public override async onTurn(): Promise<void> {
    console.log(this.role.getName(), "陷入混亂中無法進行攻擊操作");
    const moveStrategy = this.randomMoveStrategy();
    await this.role.handleMove(moveStrategy);
  }

  protected getDurationRound(): number {
    return 3;
  }

  public getType(): EState {
    return EState.Orderless;
  }

  private randomMoveStrategy() {
    const rand = Math.floor(Math.random() * 2); // 生成 0 到 3 之間的隨機數字
    switch (rand) {
      case 0:
        return new MoveLeftRightStrategy(this.role);
      case 1:
        return new MoveUpDownStrategy(this.role);
      default:
        throw Error("不支援操作");
    }
  }
}
