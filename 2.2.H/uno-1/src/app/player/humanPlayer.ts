import { Card } from '../card/card';
import { IPlayerActionStrategy } from '../playerActionStrategy/playerActionStrategy';
import { Player } from './player';

export class HumanPlayer extends Player {
  constructor(id: number, playerAction: IPlayerActionStrategy) {
    super(id, playerAction);
  }


}
