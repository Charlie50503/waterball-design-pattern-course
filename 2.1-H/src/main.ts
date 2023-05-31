import { Coord } from './app/coord';
import { Gander, Individual } from './app/individual';
import { MatchmakingSystem } from './app/matchmakingSystem';
import { DistanceBasedReverseStrategy } from './app/matchTypeStrategy/distanceBasedReverseStrategy';
import { DistanceBasedStrategy } from './app/matchTypeStrategy/distanceBasedStrategy';
import { HabitBasedReverseStrategy } from './app/matchTypeStrategy/habitBasedReverseStrategy';
import { HabitBasedStrategy } from './app/matchTypeStrategy/habitBasedStrategy';
import { CommonHabitSizeBehavior, DistanceBehavior } from './app/matchTypeStrategy/matchBehavior/calculatePointBehavior';
import { DistanceBasedCompareBehavior, HabitBasedCompareBehavior } from './app/matchTypeStrategy/matchBehavior/compareBehavior';

function main() {
  const matchmakingSystem = new MatchmakingSystem();
  matchmakingSystem.addIndividual(new Individual(
    2,
    '小華',
    Gander.MALE,
    25,
    '你好，我喜歡游泳和閱讀。',
    new Set(['游泳', '閱讀']),
    new Coord(2000, 2),
    new HabitBasedStrategy(new HabitBasedCompareBehavior(true), new CommonHabitSizeBehavior)
  ));
  matchmakingSystem.addIndividual(new Individual(
    3,
    '小麗',
    Gander.FEMALE,
    22,
    '你好，我喜歡跑步和畫畫。',
    new Set(['跑步', '畫畫']),
    new Coord(3000, 3),
    new DistanceBasedReverseStrategy(new DistanceBasedCompareBehavior(true), new DistanceBehavior)
  ));
  matchmakingSystem.addIndividual(new Individual(
    4,
    '小強',
    Gander.MALE,
    28,
    '你好，我喜歡音樂和電影。',
    new Set(['音樂', '電影']),
    new Coord(4000, 4),
    new HabitBasedReverseStrategy(new HabitBasedCompareBehavior(true), new CommonHabitSizeBehavior)
  ));


  // matchmakingSystem.addIndividual(new Individual(
  //   1,
  //   '小明',
  //   Gander.MALE,
  //   18,
  //   '你好',
  //   new Set(['籃球','2222']),
  //   new Coord(1000, 1),
  //   new HabitBasedStrategy(new HabitBasedCompareBehavior(false),new CommonHabitSizeBehavior)
  // ));
  // matchmakingSystem.addIndividual(new Individual(
  //   2,
  //   '小明2',
  //   Gander.MALE,
  //   18,
  //   '你好',
  //   new Set(['SSS','2222']),
  //   new Coord(1, 1),
  //   new HabitBasedReverseStrategy(new HabitBasedCompareBehavior(true),new CommonHabitSizeBehavior)
  // ));
  // matchmakingSystem.addIndividual(new Individual(
  //   3,
  //   '小明3',
  //   Gander.MALE,
  //   18,
  //   '你好',
  //   new Set(['333','籃球']),
  //   new Coord(10000, 8000),
  //   new DistanceBasedStrategy(new DistanceBasedCompareBehavior(false),new DistanceBehavior)
  // ));
  // matchmakingSystem.addIndividual(new Individual(
  //   4,
  //   '小明4',
  //   Gander.MALE,
  //   18,
  //   '你好',
  //   new Set(['2222','籃球']),
  //   new Coord(10000, 10000),
  //   new DistanceBasedReverseStrategy(new DistanceBasedCompareBehavior(true),new DistanceBehavior)
  // ));
  matchmakingSystem.startMatch();
}

main();
