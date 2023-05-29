import { DistanceBehavior } from './matchBehavior/calculatePointBehavior';
import { DistanceBasedReverseCompareBehavior } from './matchBehavior/compareBehavior';
import { MatchTypeStrategy } from './matchTypeStrategy';


export class DistanceBasedReverseStrategy extends MatchTypeStrategy {
  constructor(compareBehavior:DistanceBasedReverseCompareBehavior,calculatePointBehavior:DistanceBehavior) {
    super(compareBehavior,calculatePointBehavior);
  }

}