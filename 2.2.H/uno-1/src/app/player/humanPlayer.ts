import { playerActionStrategy } from '../playerActionStrategy/playerActionStrategy';
import { Player } from './player';

export class HumanPlayer extends Player {
  constructor(id: number, playerAction: playerActionStrategy) {
    super(id, playerAction);
  }

  showCard(): void {
      
  }
}
