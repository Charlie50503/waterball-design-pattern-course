import { NormalState } from './normalState';
import { State } from './state';
import { EState } from './state.enum';

export class Poisoned extends State {
  public getName(): string {
    return '中毒';
  }

  public getDurationRound(): number {
    return 3;
  }

  public onDamage(damage: number): void {
    this.role.onDamage(damage);
  }

  public getType(): EState {
    return EState.Poisoned;
  }

  public onRoundStart(): void {
    // 每回合開始時失去15點生命值
    this.onDamage(15);
  }
}
