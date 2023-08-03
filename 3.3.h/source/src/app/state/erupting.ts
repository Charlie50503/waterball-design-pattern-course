import { NormalState } from './normalState';
import { State } from './state';
import { EState } from './state.enum';
import { Teleport } from './teleport';

export class Erupting extends State {
  public getName(): string {
    return '爆發';
  }

  public getDurationRound(): number {
    return 3;
  }

  public onRoundEnd(): void {
    this.addCurrentDurationRoundCount();
    if (this.isDurationRoundEnd()) {
      this.role.setState(new Teleport(this.role));
    }
  }

  public getType(): EState {
    return EState.Erupting;
  }

  public override onAttack(): void {
    const map = this.role.getMap();
    map.roles
      .filter((role) => !role.getPosition().equals(this.role.getPosition()))
      .forEach((role) => {
        role.onDamage(50);
      });
  }
}
