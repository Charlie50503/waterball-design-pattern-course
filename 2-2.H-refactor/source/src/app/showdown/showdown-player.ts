import { reselectWithErrorHandling } from '../helper/errorHandle';
import rl from '../helper/readline';
import { Hand } from '../template/hand';
import { Player } from '../template/player';
import { Rank, ShowdownCard, Suit } from './showdown-card';

export abstract class ShowdownPlayer extends Player<ShowdownCard> {
  point = 0;

  gainPoint() {
    this.point++;
  }

  abstract takeTurn(): Promise<ShowdownCard> | ShowdownCard;
}

export class AIShowdownPlayer extends ShowdownPlayer {
  takeTurn(): ShowdownCard {
    const randomCardIndex = Math.floor(Math.random() * this.hand.cards.length);
    const randomCard = this.hand.cards[randomCardIndex];
    return randomCard;
  }
}
export class HumanShowdownPlayer extends ShowdownPlayer {
  action = new HumanAction();
  async takeTurn(): Promise<ShowdownCard> {
    // 顯示檯面上的卡牌給玩家看
    // 顯示玩家手牌給玩家看
    this.action.viewCards(this.hand.cards);
    // 玩家選擇出牌
    const result = await reselectWithErrorHandling(
      this,
      () => this.action.selectCard(this.hand),
      '選擇了無效玩家代號'
    );
    return result;
  }
}

export class HumanAction {
  viewCards(cards: ShowdownCard[]) {
    console.log('你的手牌----------------');

    cards.forEach((card, index) => {
      console.log(
        `手牌編號:${index} 階級:${Rank[card.rank]}  花色:${Suit[card.suit]}`
      );
    });

    console.log('----------------');
  }

  selectCard(hand: Hand<ShowdownCard>): Promise<ShowdownCard> {
    return new Promise((resolve, reject) => {
      rl.question('請選擇要出的卡牌編號 : ', (input) => {
        if (isNaN(Number(input))) {
          reject('輸入錯誤,請重新輸入');
        } else {
          const index = Number(input);
          const card = hand.findCard(index);
          if (card) {
            resolve(hand.spliceCard(index)[0]);
          } else {
            reject('輸入錯誤的卡牌代號');
          }
        }
      });
    });
  }
}
