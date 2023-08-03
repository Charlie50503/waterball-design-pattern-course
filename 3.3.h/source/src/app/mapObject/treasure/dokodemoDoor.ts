import { Poisoned } from './../../state/poisoned';
import { Role } from '../role';
import { Treasure } from './treasure';
import { Healing } from '../../state/healing';
import { Teleport } from '../../state/teleport';

export class DokodemoDoor extends Treasure {
  static readonly PROBABILITY = 0.1;
  getEffect(): void {}

  public getName(): string {
    return '任意門';
  }



  public onTouch(toucher: Role): void {
    toucher.setState(new Teleport(toucher));
  }
}
