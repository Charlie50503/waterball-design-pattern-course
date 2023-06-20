import { Color, UnoCard, UnoNumber } from '../unoCard';
import { UnoPlayer } from './unoPlayer';

export abstract class UnoAIPlayer extends UnoPlayer {
  constructor() {
    super();
  }

  public async showCard(
    cards: UnoCard[],
    lastCard: UnoCard | null
  ): Promise<UnoCard | null> {
    const possibleCards: UnoCard[] = [];

    if (lastCard === null) {
      return cards.splice(0, 1)[0];
    }
    if (this.isSameColorExist(lastCard.color, cards)) {
      possibleCards.push(...this.findAllSameColorCard(lastCard.color, cards));
    } else if (this.isSameNumberExist(lastCard.number, cards)) {
      possibleCards.push(...this.findAllSameNumberCard(lastCard.number, cards));
    }

    if (possibleCards.length > 0) {
      return this.randomSelect(possibleCards, cards);
    }
    return null;
  }

  private randomSelect(possibleCards: UnoCard[], cards: UnoCard[]): UnoCard {
    const randomIndex = Math.floor(Math.random() * possibleCards.length);
    const selectedCard = possibleCards[randomIndex];

    // 從手中移除選擇的牌
    const cardIndexInHand = cards.findIndex((card) => card === selectedCard);
    cards.splice(cardIndexInHand, 1);

    return selectedCard;
  }
}
