import { reselectWithErrorHandling } from '../helper/errorHandle';
import rl from '../helper/readline';
import { Hand } from '../template/hand';
import { Player } from '../template/player';
import { UNO } from './uno';
import { UnoCard, UnoColor } from './uno-card';

export abstract class UnoPlayer extends Player<UnoCard> {
  hasValidCards(topCard: UnoCard) {
    return this.hand.cards.filter((card) => topCard.isMatch(card)).length > 0;
  }

  abstract takeTurn(
    topCard: UnoCard,
    game: UNO
  ): UnoCard | null | Promise<UnoCard | null>;

  passRound(game: UNO) {
    const card = game.deck.drawCard();

    if (game.deck.cards.length === 0) {
      game.deck.refill([...game.table]);
      game.table = [];
      game.deck.shuffle();
    }

    this.hand.addCard(card);
    // return this.takeTurn(topCard, game);
  }
}

export class AIUnoPlayer extends UnoPlayer {
  takeTurn(topCard: UnoCard, game: UNO): UnoCard | null {
    if (this.hasValidCards(topCard)) {
      return this.randomCard(topCard);
    } else {
      this.passRound(game);
      return null;
    }
  }

  randomCard(topCard: UnoCard): UnoCard {
    const randomCardIndex = Math.floor(Math.random() * this.hand.cards.length);
    const randomCard = this.hand.cards[randomCardIndex];
    if (topCard.isMatch(randomCard)) {
      // 若匹配成功，則從手牌中移除該卡
      this.hand.spliceCard(randomCardIndex);
      return randomCard;
    }
    return this.randomCard(topCard);
  }
}

export class HumanUnoPlayer extends UnoPlayer {
  action = new HumanAction();

  async takeTurn(topCard: UnoCard, game: UNO): Promise<UnoCard | null> {
    // 顯示檯面上的卡牌給玩家看
    this.action.showTopCard(topCard);
    // 顯示玩家手牌給玩家看
    this.action.viewCards(this.hand.cards);
    // 玩家選擇出牌
    // const card = game.deck.drawCard();

    const result = await reselectWithErrorHandling(
      this,
      () => this.action.selectCard(topCard, this.hand),
      '選擇了無效玩家代號'
    );
    if (result === 'PASS') {
      this.passRound(game);
      return null;
    }
    return result as UnoCard;
  }
}

export class HumanAction {
  showTopCard(topCard: UnoCard) {
    console.log(
      `牌面上的卡牌 顏色:${UnoColor[topCard.color]}  數字:${topCard.number}`
    );
  }
  viewCards(cards: UnoCard[]) {
    console.log('你的手牌----------------');

    cards.forEach((card, index) => {
      console.log(
        `手牌編號${index} 顏色:${UnoColor[card.color]}  數字:${card.number}`
      );
    });

    console.log('----------------');
  }

  selectCard(topCard: UnoCard, hand: Hand<UnoCard>): Promise<UnoCard | 'PASS'> {
    return new Promise((resolve, reject) => {
      rl.question(
        '請選擇要出的卡牌編號或者是輸入 "PASS" 跳過這一局 : ',
        (input) => {
          if (input === 'PASS') {
            resolve('PASS');
          } else if (isNaN(Number(input))) {
            reject('輸入錯誤,請重新輸入');
          } else {
            const index = Number(input);
            const card = hand.findCard(index);
            if (card && topCard.isMatch(card)) {
              resolve(hand.spliceCard(index)[0]);
            } else {
              reject('輸入錯誤的卡牌代號或者是與檯面上的牌不匹配');
            }
          }
        }
      );
    });
  }
}
