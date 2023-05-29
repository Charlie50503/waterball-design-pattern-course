import { Coord } from './app/coord';
import { Gander, Individual } from './app/individual';
import { MatchmakingSystem } from './app/matchmakingSystem';
import { DistanceBasedReverseStrategy } from './app/matchTypeStrategy/distanceBasedReverseStrategy';
import { DistanceBasedStrategy } from './app/matchTypeStrategy/distanceBasedStrategy';
import { HabitBasedReverseStrategy } from './app/matchTypeStrategy/habitBasedReverseStrategy';
import { HabitBasedStrategy } from './app/matchTypeStrategy/habitBasedStrategy';
import { CommonHabitSizeBehavior, DistanceBehavior } from './app/matchTypeStrategy/matchBehavior/calculatePointBehavior';
import { DistanceBasedCompareBehavior, DistanceBasedReverseCompareBehavior, HabitBasedReverseCompareBehavior } from './app/matchTypeStrategy/matchBehavior/compareBehavior';

function main() {
  const matchmakingSystem = new MatchmakingSystem();
  matchmakingSystem.addIndividual(new Individual(
    1,
    '小明',
    Gander.MALE,
    18,
    '你好',
    new Set(['籃球','2222']),
    new Coord(1000, 1),
    new HabitBasedStrategy(new HabitBasedReverseCompareBehavior,new CommonHabitSizeBehavior)
  ));
  matchmakingSystem.addIndividual(new Individual(
    2,
    '小明2',
    Gander.MALE,
    18,
    '你好',
    new Set(['SSS','2222']),
    new Coord(1, 1),
    new HabitBasedReverseStrategy(new HabitBasedReverseCompareBehavior,new CommonHabitSizeBehavior)
  ));
  matchmakingSystem.addIndividual(new Individual(
    3,
    '小明3',
    Gander.MALE,
    18,
    '你好',
    new Set(['333','籃球']),
    new Coord(10000, 8000),
    new DistanceBasedStrategy(new DistanceBasedCompareBehavior,new DistanceBehavior)
  ));
  matchmakingSystem.addIndividual(new Individual(
    4,
    '小明4',
    Gander.MALE,
    18,
    '你好',
    new Set(['2222','籃球']),
    new Coord(10000, 10000),
    new DistanceBasedReverseStrategy(new DistanceBasedReverseCompareBehavior,new DistanceBehavior)
  ));
  matchmakingSystem.startMatch();
}

main();
