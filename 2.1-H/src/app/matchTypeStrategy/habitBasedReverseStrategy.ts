import { CommonHabitSizeBehavior } from './matchBehavior/calculatePointBehavior';
import { HabitBasedCompareBehavior } from './matchBehavior/compareBehavior';
import { MatchTypeStrategy } from './matchTypeStrategy';

export class HabitBasedReverseStrategy extends MatchTypeStrategy {
  constructor(compareBehavior:HabitBasedCompareBehavior,calculatePointBehavior:CommonHabitSizeBehavior) {
    super(compareBehavior,calculatePointBehavior);
  }
}
