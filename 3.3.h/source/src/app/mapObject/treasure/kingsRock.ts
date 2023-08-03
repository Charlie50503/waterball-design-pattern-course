import { Poisoned } from './../../state/poisoned';
import { Role } from '../role';
import { Treasure } from './treasure';
import { Healing } from '../../state/healing';
import { Teleport } from '../../state/teleport';
import { Stockpile } from '../../state/stockpile';

export class KingsRock extends Treasure {
  static readonly PROBABILITY = 0.1;
  getEffect(): void {}

  public getName(): string {
    return '王者之印';
  }


  public onTouch(toucher: Role): void {
    toucher.setState(new Stockpile(toucher));
  }
}
