import { Poisoned } from './../../state/poisoned';
import { Role } from '../role';
import { Treasure } from './treasure';
import { Healing } from '../../state/healing';

export class HealingPotion extends Treasure {
  static readonly PROBABILITY = 0.15;

  public getName(): string {
    return '恢復藥水';
  }



  public getEffect(toucher: Role): void {
    toucher.setState(new Healing(toucher));
  }
}
