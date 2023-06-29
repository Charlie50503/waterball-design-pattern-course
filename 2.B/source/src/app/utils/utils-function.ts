import { Card } from '../card/card';
import { RankText } from '../card/rank';

export function countDuplicates(cards: Card[]) {
  let count: { [key in RankText]?: number } = {};

  cards.forEach((card) => {
    count[card.rank.text] = (count[card.rank.text] || 0) + 1;
  });

  return count;
}
export function hasValueInDuplicatesCount(
  obj: { [key in RankText]?: number },
  value: number
) {
  return Object.values(obj).includes(value);
}

export function findValueInDuplicatesCount(
  obj: { [key: string]: number },
  value: number
) {
  var result = [];

  for (var key in obj) {
    if (obj[key] === value) {
      result.push(key);
    }
  }

  return result;
}

export function compareArrays(arr1: string[], arr2: string[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((value, index) => value === arr2[index]);
}
