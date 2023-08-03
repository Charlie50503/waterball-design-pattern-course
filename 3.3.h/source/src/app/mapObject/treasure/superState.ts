import { Invincible } from '../../state/invincible';
import { Role } from '../role';
import { Treasure } from './treasure';

export class SuperStar extends Treasure {
  static readonly PROBABILITY = 0.1;

  public getEffect(): void {
    console.log('getEffect');
  }
  // public static getProbability(): number {
  //   return 0.1;
  // }

  public onTouch(toucher: Role): void {
    toucher.setState(new Invincible(toucher));
  }

  public getName(): string {
    return '無敵星星';
  }
}
