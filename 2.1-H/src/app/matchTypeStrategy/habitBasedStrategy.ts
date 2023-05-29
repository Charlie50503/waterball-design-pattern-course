import { Individual } from '../individual';
import { MatchBasedItem } from './habitBased.interface';
import { CalculatePointBehavior, CommonHabitSizeBehavior } from './matchBehavior/calculatePointBehavior';
import { CompareBehavior, HabitBasedCompareBehavior } from './matchBehavior/compareBehavior';
import { MatchTypeStrategy } from './matchTypeStrategy';


// 根據興趣符合多數的排在最前面
export class HabitBasedStrategy extends MatchTypeStrategy {
  constructor(compareBehavior:HabitBasedCompareBehavior,calculatePointBehavior:CommonHabitSizeBehavior) {
    super(compareBehavior,calculatePointBehavior);
  }
  // matching(ownIndividual: Individual, otherIndividuals: Individual[]) {
  //   const habitBasedList: MatchBasedItem[] = [];
  //   otherIndividuals.forEach((otherIndividual) => {
  //     let matchSize = new Set(
  //       [...ownIndividual.habits].filter((x) => otherIndividual.habits.has(x))
  //     ).size;
  //     habitBasedList.push({
  //       individual: otherIndividual,
  //       point: matchSize,
  //     });
  //   });

  //   habitBasedList.sort(compare);

  //   return habitBasedList;
  // }
}

// function compare(a: MatchBasedItem, b: MatchBasedItem) {
//   if (a.point > b.point) {
//     return -1;
//   }
//   if (a.point < b.point) {
//     return 1;
//   }
//   // a 必須等於 b
//   return 0;
// }
