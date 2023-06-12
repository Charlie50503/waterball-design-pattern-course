import { Card } from '../card/card';
import { PlayerActionStrategy } from './playerActionStrategy';

export class RandomStrategy extends PlayerActionStrategy {
  //TODO 要實現隨機抽牌
  public async showCard(cards: Card[], lastCard: Card | undefined): Promise<Card | undefined> {
    const possibleCards: Card[] = [];

    if (lastCard === undefined) {
      return cards.splice(0, 1)[0];
    }
    if (this.isSameColorExist(lastCard.color, cards)) {
      possibleCards.push(...this.findAllSameColorCard(lastCard.color, cards));
    } else if (this.isSameNumberExist(lastCard.unoNumber, cards)) {
      possibleCards.push(...this.findAllSameNumberCard(lastCard.unoNumber, cards));
    }

    if(possibleCards.length > 0){
      return this.randomSelect(possibleCards,cards);
    }
    return undefined;
  }

  private randomSelect(possibleCards: Card[],cards:Card[]): Card {
    const randomIndex = Math.floor(Math.random() * possibleCards.length);
    const selectedCard = possibleCards[randomIndex];

    // 從手中移除選擇的牌
    const cardIndexInHand = cards.findIndex(
      (card) => card === selectedCard
    );
    cards.splice(cardIndexInHand, 1);

    return selectedCard;
  }
}
