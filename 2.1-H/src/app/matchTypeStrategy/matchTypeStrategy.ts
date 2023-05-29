import { Individual } from '../individual';
import { MatchBasedItem } from './habitBased.interface';
import { CalculatePointBehavior } from './matchBehavior/calculatePointBehavior';
import { CompareBehavior } from './matchBehavior/compareBehavior';

export abstract class MatchTypeStrategy {
  //組合取代繼承
  compareBehavior:CompareBehavior;
  calculatePointBehavior:CalculatePointBehavior;

  constructor(compareBehavior:CompareBehavior,calculatePointBehavior:CalculatePointBehavior) {
    this.compareBehavior=compareBehavior;
    this.calculatePointBehavior = calculatePointBehavior
  }
  // abstract matching(i: Individual, other: Individual[]): MatchBasedItem[];

  matching(ownIndividual: Individual, otherIndividuals: Individual[]) {
    const matchBasedList: MatchBasedItem[] = [];
    otherIndividuals.forEach(
      this.loopWrapper(
        ownIndividual,
        matchBasedList,
        this.calculatePointBehavior.calculatePoint,
        this.attachMatchBasedList
      )
    );
    matchBasedList.sort(this.compareBehavior.compare);
    return matchBasedList;
  }

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
