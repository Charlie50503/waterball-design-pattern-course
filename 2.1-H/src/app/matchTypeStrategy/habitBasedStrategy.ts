import { CommonHabitSizeBehavior } from './matchBehavior/calculatePointBehavior';
import { HabitBasedCompareBehavior } from './matchBehavior/compareBehavior';
import { MatchTypeStrategy } from './matchTypeStrategy';


// 根據興趣符合多數的排在最前面
export class HabitBasedStrategy extends MatchTypeStrategy {
  constructor(compareBehavior:HabitBasedCompareBehavior,calculatePointBehavior:CommonHabitSizeBehavior) {
    super(compareBehavior,calculatePointBehavior);
  }
}