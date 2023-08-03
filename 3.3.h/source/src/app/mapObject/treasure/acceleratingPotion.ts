import { Poisoned } from './../../state/poisoned';
import { Role } from '../role';
import { Treasure } from './treasure';
import { Healing } from '../../state/healing';
import { Accelerated } from '../../state/accelerated';

export class AcceleratingPotion extends Treasure {
  static readonly PROBABILITY = 0.2;

  public getName(): string {
    return '加速藥水';
  }


  public getEffect(toucher: Role): void {
    toucher.setState(new Accelerated(toucher));
  }
}
