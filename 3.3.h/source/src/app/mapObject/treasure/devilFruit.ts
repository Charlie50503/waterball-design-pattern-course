import { Poisoned } from './../../state/poisoned';
import { Role } from '../role';
import { Treasure } from './treasure';
import { Healing } from '../../state/healing';
import { Orderless } from '../../state/orderless';

export class DevilFruit extends Treasure {
  static readonly PROBABILITY = 0.1;

  public getName(): string {
    return '惡魔果實';
  }


  public getEffect(toucher: Role): void {
    toucher.setState(new Orderless(toucher));
  }
}
