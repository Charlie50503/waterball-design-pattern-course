import { Individual } from '../individual';
import { MatchBasedItem } from './habitBased.interface';
import { CalculatePointBehavior, CommonHabitSizeBehavior } from './matchBehavior/calculatePointBehavior';
import { CompareBehavior, HabitBasedReverseCompareBehavior } from './matchBehavior/compareBehavior';
import { MatchTypeStrategy } from './matchTypeStrategy';

export class HabitBasedReverseStrategy extends MatchTypeStrategy {
  constructor(compareBehavior:HabitBasedReverseCompareBehavior,calculatePointBehavior:CommonHabitSizeBehavior) {
    super(compareBehavior,calculatePointBehavior);
  }
}
