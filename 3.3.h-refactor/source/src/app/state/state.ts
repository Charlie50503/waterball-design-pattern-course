import { EState } from "../enum/state.enum";
import { Role } from "../mapObject/role/role";
import { Normal } from "./normal";

export abstract class State {
  roundCount: number = 0;
  role: Role;

  constructor(role: Role) {
    this.role = role;
  }

  public abstract getName(): string;
  protected abstract getDurationRound(): number;
  public abstract getType(): EState;
  public enterState() {
    console.log(this.role.getName(), "進入", this.getName(), "狀態");
  }

  public onDamage(damage: number) {
    this.role.onDamage(damage);
  }

  public onAttack() {
    this.role.attack();
  }

  public onRoundStart() {}

  public async onTurn(): Promise<void> {
    await this.role.takeTurn();
  }

  public onRoundEnd() {
    this.roundCount++;
    if (this.roundCount >= this.getDurationRound()) {
      this.role.setState(new Normal(this.role));
    }
  }
}
