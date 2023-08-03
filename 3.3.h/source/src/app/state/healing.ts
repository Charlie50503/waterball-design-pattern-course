import { NormalState } from './normalState';
import { State } from './state';
import { EState } from './state.enum';

export class Healing extends State {
  public getName(): string {
    return '恢復';
  }

  public getDurationRound(): number {
    return 5;
  }

  public getType(): EState {
    return EState.Healing;
  }

  public onRoundStart(): void {
    this.role.onHealing(30);
  }
}
