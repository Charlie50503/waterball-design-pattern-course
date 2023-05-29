import { CalculatePointBehavior, DistanceBehavior } from './matchBehavior/calculatePointBehavior';
import { CompareBehavior, DistanceBasedCompareBehavior } from './matchBehavior/compareBehavior';
import { MatchTypeStrategy } from './matchTypeStrategy';

export class DistanceBasedStrategy extends MatchTypeStrategy {
  constructor(compareBehavior:DistanceBasedCompareBehavior,calculatePointBehavior:DistanceBehavior) {
    super(compareBehavior,calculatePointBehavior);
  }

}

