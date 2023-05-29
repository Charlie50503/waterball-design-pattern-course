import { CommonHabitSizeBehavior } from './matchBehavior/calculatePointBehavior';
import { HabitBasedReverseCompareBehavior } from './matchBehavior/compareBehavior';
import { MatchTypeStrategy } from './matchTypeStrategy';

export class HabitBasedReverseStrategy extends MatchTypeStrategy {
  constructor(compareBehavior:HabitBasedReverseCompareBehavior,calculatePointBehavior:CommonHabitSizeBehavior) {
    super(compareBehavior,calculatePointBehavior);
  }
}
