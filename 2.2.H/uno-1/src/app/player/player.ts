import { Card } from '../card/card';
import { Deck } from '../deck';
import { Hand } from '../hand';
import { IPlayerActionStrategy } from '../playerActionStrategy/playerActionStrategy';
import { toSpliced } from '../utils/helper';

export abstract class Player {
  id: number;
  name: string = '';
  playerAction: IPlayerActionStrategy;

  hand: Hand;

  constructor(id: number, playerAction: IPlayerActionStrategy) {
    this.id = id;
    this.playerAction = playerAction;
    this.hand = new Hand();
  }

  async showCard(lastCard: Card | undefined): Promise<Card | undefined> {
    return await this.playerAction.showCard(this.hand.cards, lastCard);
  }

  nameHimself(name: string) {
    this.name = name;
  }
  drawCard(card: Card) {
    this.hand.cards.push(card);
  }
}
