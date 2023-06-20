import rl from '../../utils/readline';
import { Color, UnoCard, UnoNumber } from '../unoCard';
import { UnoPlayer } from './unoPlayer';

export abstract class UnoHumanPlayer extends UnoPlayer {
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
      return await this.commandLineSelect(possibleCards, cards);
    }
    return null;
  }

  private async commandLineSelect(possibleCards: UnoCard[], cards: UnoCard[]) {
    while (true) {
      try {
        this.viewPlayerHand(possibleCards);
        return await this.selectCard(possibleCards);
      } catch (error) {
        console.log(error);
      }
    }
  }

  private viewPlayerHand(cards: UnoCard[]) {
    console.log('-------------------------');
    console.log('可出手牌');
    cards.forEach((card, index) => {
      console.log(
        `編號:${index} ,手牌 花色: ${card.color}, 數字: ${card.number}`
      );
    });
    console.log('-------------------------');
  }

  private async selectCard(possibleCards: UnoCard[]): Promise<UnoCard | null> {
    return new Promise((resolve, reject) => {
      if (possibleCards.length === 0) {
        resolve(null);
      }
      rl.question(`請選擇要出的牌 : `, (index: string) => {
        if (isNaN(Number(index))) {
          return reject('請輸入數字');
        } else if (Number(index) > possibleCards.length - 1) {
          return reject('無效編號');
        }
        return resolve(possibleCards[Number(index)]);
      });
    });
  }
}
