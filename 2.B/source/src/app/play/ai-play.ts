import { CardPattern } from '../card-pattern/card-pattern';
import rl from '../helper/helper';
import { Player } from '../player/player';
import { Round } from '../round';
import { Play, PlayResultStatus } from './play';

export class AIPlay extends Play {

  public playHook(
    player: Player,
    round: Round,
    isFirstPlay:boolean
  ): Promise<CardPattern | PlayResultStatus.PASS> {
    console.log("AI PlayHook");
    // TODO 檢查這裡為什麼會出現ＣＬＩ沒有辦法輸入的問題
    return new Promise((resolve, reject) => {
      rl.question('請選擇要出的卡牌編號 :', (answer) => {
        console.log(answer);

        if (answer === '-1') {
          if (this.isLealPass(round)) {
             resolve(PlayResultStatus.PASS);
          } else {
             reject('你不能在新的回合中喊 PASS');
          }
        } else {
          if (this.isLegalInput(answer)) {
            const cardIndexSet = new Set(answer.split(' '));
            const cards = player.hand.cards.filter((card, index) => {
              return cardIndexSet.has(index.toString());
            });
            if(this.isLegalPlay(round.topPlay,cards,isFirstPlay)){
              resolve(this.formCardPattern(cards));
            }else{
              reject('此牌型不合法，請再嘗試一次。');
            }
          } else {
             reject('此牌型不合法，請再嘗試一次。');
          }
        }
      });
    });
  }

  isLegalInput(answer: string) {
    let ary = answer.split(' ');
    return ary.every((item) => {
      return !isNaN(Number(item));
    });
  }
}
