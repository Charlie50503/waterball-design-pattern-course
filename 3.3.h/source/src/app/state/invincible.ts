import { State } from './state';
import { EState } from './state.enum';

export class Invincible extends State {
  public getName(): string {
    return '無敵';
  }

  public getDurationRound(): number {
    return 2;
  }

  public onDamage(damage: number): void {
    console.log('角色屬於無敵狀態,無法受到傷害');
    return this.role.onDamage(0);
  }

  public getType(): EState {
    return EState.Invincible;
  }
}
