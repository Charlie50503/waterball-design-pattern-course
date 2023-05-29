import { DistanceBehavior } from './matchBehavior/calculatePointBehavior';
import { DistanceBasedCompareBehavior } from './matchBehavior/compareBehavior';
import { MatchTypeStrategy } from './matchTypeStrategy';


export class DistanceBasedReverseStrategy extends MatchTypeStrategy {
  constructor(compareBehavior:DistanceBasedCompareBehavior,calculatePointBehavior:DistanceBehavior) {
    super(compareBehavior,calculatePointBehavior);
  }

}