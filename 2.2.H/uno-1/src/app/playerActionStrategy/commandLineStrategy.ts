import { Card } from '../card/card';
import rl from '../utils/readline';
import { PlayerActionStrategy } from './playerActionStrategy';

export class CommandLineStrategy extends PlayerActionStrategy {
  // constructor(){
  //   super();
  // }
  //TODO 要實現指令抽牌
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
      return await this.commandLineSelect(possibleCards,cards);
    }
    return undefined;
  }
  
  private async commandLineSelect(possibleCards:Card[],cards:Card[]){
    while (true) {
      try {
        this.viewPlayerHand(possibleCards);
        return await this.selectCard(possibleCards);
      } catch (error) {
        console.log(error);
        
      }
    }

  }

  private viewPlayerHand(cards:Card[]){
    console.log('-------------------------');
    console.log('可出手牌');
    cards.forEach((card,index) => {
      console.log(`編號:${index} ,手牌 花色: ${card.color}, 數字: ${card.unoNumber}`);
    });
    console.log('-------------------------');
  }

  private async selectCard(possibleCards:Card[]): Promise<Card | undefined> {
    return new Promise((resolve, reject) => {
      if (possibleCards.length === 0) {
        resolve(undefined);
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
