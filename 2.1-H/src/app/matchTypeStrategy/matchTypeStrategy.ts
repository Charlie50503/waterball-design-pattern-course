import { Individual } from '../individual';
import { MatchBasedItem } from './habitBased.interface';

export abstract class MatchTypeStrategy {
  abstract matching(i: Individual, other: Individual[]): MatchBasedItem[];

  // matching(ownIndividual: Individual, otherIndividuals: Individual[]) {
  //   const matchBasedList: MatchBasedItem[] = [];
  //   otherIndividuals.forEach(
  //     this.loopWrapper(
  //       ownIndividual,
  //       matchBasedList,
  //       commonHabitSize,
  //       this.attachMatchBasedList
  //     )
  //   );
  //   matchBasedList.sort(compare);
  //   return matchBasedList;
  // }

  loopWrapper(
    ownIndividual: Individual,
    matchBasedList: MatchBasedItem[],
    calculatePoint: (a: Individual, b: Individual) => number,
    attachMatchBasedList: (
      list: MatchBasedItem[],
      other: Individual,
      point: number
    ) => void
  ) {
    return (otherIndividual: Individual) => {
      const point = calculatePoint(ownIndividual, otherIndividual);
      attachMatchBasedList(matchBasedList, otherIndividual, point);
    };
  }

  attachMatchBasedList(
    matchBasedList: MatchBasedItem[],
    individual: Individual,
    point: number
  ) {
    matchBasedList.push({
      individual: individual,
      point: point,
    });
  }
}
