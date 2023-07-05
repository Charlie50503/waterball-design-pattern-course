import { Card } from "../app/card/card";
import { ranks, RankText } from "../app/card/rank";
import { suits } from "../app/card/suit";

export function mapCardStr(cardStr:string){
  const cardStrs = cardStr.split(' ');
  return cardStrs.map(cs => {
    const suitText = cs[0];
    const rankText = cs.substring(2, cs.length - 1) as RankText;

    const suit = suits.find(s => s.text === suitText);
    const rank = ranks.find(r => r.text === rankText);

    if (!suit || !rank) {
      throw new Error(`Invalid card string: ${cs}`);
    }

    return new Card(rank, suit);
  });
}