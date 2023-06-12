import { Card } from '../card/card';
import { Color } from '../card/color';
import { UnoNumber } from '../card/uno-number';

export interface IPlayerActionStrategy {
  showCard(cards: Card[], lastCard: Card | undefined): Promise<Card | undefined>;
}

export abstract class PlayerActionStrategy implements IPlayerActionStrategy {
  public abstract showCard(cards: Card[], lastCard: Card | undefined): Promise<Card | undefined>;

  protected findAllSameColorCard(lastCardColor: Color, cards: Card[]) {
    return cards.filter(card => card.color === lastCardColor);
  }

  protected isSameColorExist(lastCardColor: Color, cards: Card[]) {
    return this.findAllSameColorCard(lastCardColor, cards).length > 0;
  }

  protected findAllSameNumberCard(lastCardNumber: UnoNumber, cards: Card[]) {
    return cards.filter(card => card.unoNumber === lastCardNumber);
  }

  protected isSameNumberExist(lastCardNumber: UnoNumber, cards: Card[]) {
    return this.findAllSameNumberCard(lastCardNumber, cards).length > 0;
  }
}

