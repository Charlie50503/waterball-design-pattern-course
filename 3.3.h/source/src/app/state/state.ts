import { MoveNormalStrategy } from '../mapObject/moveStrategy';
import { Role } from '../mapObject/role';
import { NormalState } from './normalState';
import { EState } from './state.enum';

export abstract class State {
  role: Role;
  currentDurationRoundCount: number = 0;

  constructor(role: Role) {
    this.role = role;
    console.log(`進入到狀態: ${this.getName()}`);
  }
  public abstract getName(): string;
  public onRoundStart(){};
  public abstract getDurationRound(): number;
  public abstract getType(): EState;
  public async onMove(): Promise<void> {
    const moveStrategy = new MoveNormalStrategy(this.role);
    await this.role.handleMove(moveStrategy);
  }
  public addCurrentDurationRoundCount() {
    this.currentDurationRoundCount++;
  }

  public isDurationRoundEnd() {
    return this.currentDurationRoundCount >= this.getDurationRound();
  }

  public onDamage(damage: number): void {
    this.role.onDamage(damage);
  }

  public onRoundEnd(): void {
    this.addCurrentDurationRoundCount();
    if (this.isDurationRoundEnd()) {
      this.role.setState(new NormalState(this.role));
    }
  }

  public onAttack() {
    this.role.attack();
  }

  public countCurrentDurationRound() {
    this.currentDurationRoundCount++;
  }
}
