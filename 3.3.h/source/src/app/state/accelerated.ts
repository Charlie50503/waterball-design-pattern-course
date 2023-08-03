import { NormalState } from './normalState';
import { State } from './state';
import { EState } from './state.enum';

export class Accelerated extends State {
  public getEffect(): void {
    console.log('getEffect');
  }

  public getName(): string {
    return '加速';
  }

  public getDurationRound(): number {
    return 3;
  }

  public override onDamage(damage: number): void {
    this.role.onDamage(damage);
    this.role.setState(new NormalState(this.role));
  }
  public getType(): EState {
    return EState.Accelerated;
  }
}
