import { Poisoned } from './../../state/poisoned';
import { Role } from '../role';
import { Treasure } from './treasure';

export class Poison extends Treasure {
  static readonly PROBABILITY = 0.25;
  getEffect(): void {}

  public getName(): string {
    return '毒藥';
  }

  public onTouch(toucher: Role): void {
    toucher.setState(new Poisoned(toucher));
  }
}
