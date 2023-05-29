import { Coord } from './app/coord';
import { Gander, Individual } from './app/individual';
import { MatchmakingSystem } from './app/matchmakingSystem';
import { HabitBasedReverseStrategy } from './app/matchTypeStrategy/habitBasedReverseStrategy';

function main() {
  const matchmakingSystem = new MatchmakingSystem();
  matchmakingSystem.addIndividual(new Individual(
    1,
    '小明',
    Gander.MALE,
    18,
    '你好',
    new Set(['籃球','2222']),
    new Coord(1, 1),
    new HabitBasedReverseStrategy()
  ));
  matchmakingSystem.addIndividual(new Individual(
    2,
    '小明2',
    Gander.MALE,
    18,
    '你好',
    new Set(['足球','壘球']),
    new Coord(1, 1),
    new HabitBasedReverseStrategy()
  ));
  matchmakingSystem.addIndividual(new Individual(
    3,
    '小明3',
    Gander.MALE,
    18,
    '你好',
    new Set(['333','籃球']),
    new Coord(1000, 1000),
    new HabitBasedReverseStrategy()
  ));
  matchmakingSystem.addIndividual(new Individual(
    4,
    '小明4',
    Gander.MALE,
    18,
    '你好',
    new Set(['1111','壘球']),
    new Coord(1000, 1000),
    new HabitBasedReverseStrategy()
  ));
  matchmakingSystem.startMatch();
}

main();
