import { Individual } from '../individual';
import { MatchBasedItem } from './habitBased.interface';
import { MatchTypeStrategy } from './matchTypeStrategy';

export class HabitBasedReverseStrategy extends MatchTypeStrategy {
  constructor() {
    super()
  }

  matching(ownIndividual: Individual, otherIndividuals: Individual[]) {
    const matchBasedList: MatchBasedItem[] = [];
    otherIndividuals.forEach(
      this.loopWrapper(
        ownIndividual,
        matchBasedList,
        commonHabitSize,
        this.attachMatchBasedList
      )
    );
    matchBasedList.sort(compare);
    return matchBasedList;
  }

}

function commonHabitSize(
  ownIndividual: Individual,
  otherIndividual: Individual
) {
  return new Set(
    [...ownIndividual.habits].filter((x) => otherIndividual.habits.has(x))
  ).size;
}

function compare(a: MatchBasedItem, b: MatchBasedItem) {
  if (a.point > b.point) {
    return -1;
  }
  if (a.point < b.point) {
    return 1;
  }
  // a 必須等於 b
  return 0;
}
