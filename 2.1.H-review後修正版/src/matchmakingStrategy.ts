import { Individual } from './individual';
import { MatchBasedItem } from './interface';
export abstract class MatchmakingStrategy {
  abstract sortMatchmaking(i: Individual, individuals: Individual[]): MatchBasedItem[];
}

export class DistanceBasedMatchmakingStrategy extends MatchmakingStrategy {
  sortMatchmaking(i: Individual, individuals: Individual[]): MatchBasedItem[] {
    const matchBasedList: MatchBasedItem[] = [];
    individuals.forEach((otherIndividual: Individual) => {
      const point = Math.sqrt(
        Math.pow(i.coord.y - otherIndividual.coord.y, 2) +
        Math.pow(i.coord.x - otherIndividual.coord.x, 2)
      )
      matchBasedList.push({
        individual: otherIndividual,
        point: point,
      });
    });
    matchBasedList.sort((a, b) => {
      if (a.point > b.point) {
        return 1;
      } else if (a.point < b.point) {
        return -1
      } else {
        return 0
      }
    });
    return matchBasedList;
  }
}

export class HabitBasedMatchmakingStrategy extends MatchmakingStrategy {
  sortMatchmaking(i: Individual, individuals: Individual[]): MatchBasedItem[] {
    const matchBasedList: MatchBasedItem[] = [];
    individuals.forEach((otherIndividual: Individual) => {
      const point =
        i.habits.filter(iHabit => otherIndividual.habits.includes(iHabit)).length;
      matchBasedList.push({
        individual: otherIndividual,
        point: point,
      });
    });
    matchBasedList.sort((a, b) => {
      if (a.point > b.point) {
        return -1;
      } else if (a.point < b.point) {
        return 1
      } else {
        return 0
      }
    });
    return matchBasedList;
  }
}

export class Reverse extends MatchmakingStrategy {
  matchmakingStrategy: MatchmakingStrategy;
  constructor(matchmakingStrategy: MatchmakingStrategy) {
    super();
    this.matchmakingStrategy = matchmakingStrategy
  }
  sortMatchmaking(i: Individual, individuals: Individual[]): MatchBasedItem[] {
    const candidates = this.matchmakingStrategy.sortMatchmaking(i, individuals);
    return candidates.reverse();
  }
}
