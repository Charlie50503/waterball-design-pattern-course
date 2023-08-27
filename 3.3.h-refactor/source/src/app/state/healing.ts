import { EState } from "../enum/state.enum";
import { State } from "./state";

export class Healing extends State {
  public getName(): string {
    return "恢復";
  }

  public onRoundStart() {
    this.role.onHealing(30);
  }

  protected getDurationRound(): number {
    return 5;
  }

  public getEffect(): void {}

  public getType(): EState {
    return EState.Healing;
  }
}
