import { EState } from "../enum/state.enum";
import { Normal } from "./normal";
import { State } from "./state";

export class Accelerated extends State {
  public getName(): string {
    return "加速";
  }

  protected getDurationRound(): number {
    return 3;
  }

  public getType(): EState {
    return EState.Accelerated;
  }

  public override onDamage(damage: number): void {
    this.role.onDamage(damage);
    this.role.setState(new Normal(this.role));
  }

  public override async onTurn(): Promise<void> {
    await this.role.takeTurn();
    await this.role.takeTurn();
  }
}
