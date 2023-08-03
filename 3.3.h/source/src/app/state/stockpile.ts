import { Erupting } from './erupting';
import { State } from './state';
import { EState } from './state.enum';

export class Stockpile extends State {
  public getType(): EState {
    return EState.Stockpile;
  }

  public getName(): string {
    return '蓄力';
  }

  public getDurationRound(): number {
    return 2;
  }

  public override onRoundEnd(): void {
    this.addCurrentDurationRoundCount();
    if (this.isDurationRoundEnd()) {
      this.role.setState(new Erupting(this.role));
    }
  }
}
