import { State } from './state';
import { EState } from './state.enum';

export class NormalState extends State {
  public getName(): string {
    return '正常狀態';
  }

  public getDurationRound(): number {
    return 99999;
  }

  public getType(): EState {
    return EState.normal;
  }

}
