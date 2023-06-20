import { Deck } from '../template/deck';
import { UnoCard, UnoColor, UnoNumber } from './uno-card';

export class UnoDeck extends Deck<UnoCard> {
  constructor(){
    const cards: UnoCard[] = [];
    for (let i = 0; i < 10; i++) {
      cards.push(new UnoCard(UnoColor.BLUE, i as UnoNumber));
      cards.push(new UnoCard(UnoColor.RED, i as UnoNumber));
      cards.push(new UnoCard(UnoColor.YELLOW, i as UnoNumber));
      cards.push(new UnoCard(UnoColor.GREEN, i as UnoNumber));
    }
    super(cards);
    this.shuffle();
  }
}
