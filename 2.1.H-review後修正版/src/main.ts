import { Coord } from "./coord";
import { Gander, Individual } from "./individual";
import { DistanceBasedMatchmakingStrategy, HabitBasedMatchmakingStrategy, Reverse } from "./matchmakingStrategy";
import { MatchmakingSystem } from "./matchmakingSystem";

function main() {
  // const matchmakingSystem = new MatchmakingSystem(new Reverse(new DistanceBasedMatchmakingStrategy()));
  // const matchmakingSystem = new MatchmakingSystem(new DistanceBasedMatchmakingStrategy());
  // const matchmakingSystem = new MatchmakingSystem(new HabitBasedMatchmakingStrategy());
  const matchmakingSystem = new MatchmakingSystem(new Reverse(new HabitBasedMatchmakingStrategy()));
  matchmakingSystem.addIndividual(new Individual(
    1,
    '小明',
    Gander.MALE,
    18,
    '你好',
    ['籃球','2222','足球','滑板'],
    new Coord(1000, 1),
  ));
  matchmakingSystem.addIndividual(new Individual(
    2,
    '小明2',
    Gander.MALE,
    18,
    '你好',
    ['SSS','2222','壘球','棒球'],
    new Coord(1, 1),
  ));
  matchmakingSystem.addIndividual(new Individual(
    3,
    '小明3',
    Gander.MALE,
    18,
    '你好',
    ['AAA','棒球','壘球'],
    new Coord(10000, 8000),
  ));
  matchmakingSystem.addIndividual(new Individual(
    4,
    '小明4',
    Gander.MALE,
    18,
    '你好',
    ['籃球','足球','滑板'],
    new Coord(10000, 10000),
  ));
  // matchmakingSystem.startMatch();
 
  matchmakingSystem.match()
}

main();
