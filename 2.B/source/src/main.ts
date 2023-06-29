import { Card } from "./app/card/card";
import { ranks } from "./app/card/rank";
import { suits } from "./app/card/suit";
import { Deck } from "./app/deck";

function main(){
  // const deck = new Deck()
}

main();

// 定義一個函數來生成所有可能的順子
function generateAllStraights(): Card[][] {
  let straights: Card[][] = [];
  for (let i = 0; i < ranks.length - 4; i++) {
    let straight: Card[] = [];
    for (let j = i; j < i + 5; j++) {
      straight.push(new Card(ranks[j % ranks.length], suits[0])); // 花色預設為第一種
    }
    straights.push(straight);
  }
  return straights;
}

// 所有可能的順子
const allStraights = generateAllStraights();
allStraights.forEach((straight) => {
  console.log("-------------------------");

  straight.forEach((card) => {
    console.log(card.rank.text, card.suit.text);
  })

  console.log("-------------------------");
})
// console.log(allStraights);


// 定義一個函數來比較兩個順子的大小
function compareStraights(straight1: Card[], straight2: Card[]): number {
  let value1 = straight1[straight1.length - 1].rank.value; // 取順子最大的牌來比較
  let value2 = straight2[straight2.length - 1].rank.value; // 取順子最大的牌來比較
  if (value1 > value2) return 1; // 順子1較大
  if (value1 < value2) return -1; // 順子2較大
  return 0; // 兩順子相等
}

// 測試比較兩個順子的函數
console.log(compareStraights(allStraights[0], allStraights[1]));
