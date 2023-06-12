import { Deck } from '../deck';
import { playerActionStrategy } from '../playerActionStrategy/playerActionStrategy';

export abstract class Player {
  id: number;
  name: string = "";
  playerAction: playerActionStrategy;

  constructor(id: number, playerAction: playerActionStrategy) {
    this.id = id;
    this.playerAction = playerAction;
  }

  abstract showCard(): void;
  nameHimself(name: string) {
    this.name = name;
  }
  drawCard(deck: Deck) {}
}
