import { UnoCard } from './unoCard';

export class PlayedCards {
  cards: UnoCard[] = [];
  drawCards():UnoCard[] {
    return this.cards.splice(0, this.cards.length - 1);
  }
  clean() {
    this.cards = [];
  }

  addCard(card: UnoCard){
      this.cards.push(card);
  }
}
