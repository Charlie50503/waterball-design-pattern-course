import { Color, UnoCard, UnoNumber } from '../unoCard';
import { AbstractPlayer } from "../../template/abstractPlayer";

export abstract class UnoPlayer extends AbstractPlayer {
  constructor(){
    super(5);
  }

  public abstract showCard(cards: UnoCard[], lastCard: UnoCard | null): Promise<UnoCard | null>;

  protected findAllSameColorCard(lastCardColor: Color, cards: UnoCard[]) {
    return cards.filter(card => card.color === lastCardColor);
  }

  protected isSameColorExist(lastCardColor: Color, cards: UnoCard[]) {
    return this.findAllSameColorCard(lastCardColor, cards).length > 0;
  }

  protected findAllSameNumberCard(lastCardNumber: UnoNumber, cards: UnoCard[]) {
    return cards.filter(card => card.number === lastCardNumber);
  }

  protected isSameNumberExist(lastCardNumber: UnoNumber, cards: UnoCard[]) {
    return this.findAllSameNumberCard(lastCardNumber, cards).length > 0;
  }
}