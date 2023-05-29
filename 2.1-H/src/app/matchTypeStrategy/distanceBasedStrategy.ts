import { Individual } from '../individual';
import { MatchBasedItem } from './habitBased.interface';
import { MatchTypeStrategy } from './matchTypeStrategy';

export class DistanceBasedStrategy extends MatchTypeStrategy {
  matching(ownIndividual: Individual, otherIndividuals: Individual[]) {
    const matchBasedList: MatchBasedItem[] = [];
    otherIndividuals.forEach(loop(ownIndividual, matchBasedList));
    matchBasedList.sort(compare);
    return matchBasedList;
  }
}

function loop(ownIndividual: Individual, matchBasedList: MatchBasedItem[]) {
  return (otherIndividual: Individual) => {
    matchBasedList.push({
      individual: otherIndividual,
      point: distance(ownIndividual, otherIndividual),
    });
  };
}

function distance(ownIndividual: Individual, otherIndividual: Individual) {
  return Math.sqrt(
    Math.pow(ownIndividual.coord.y - otherIndividual.coord.y, 2) +
      Math.pow(ownIndividual.coord.x - otherIndividual.coord.x, 2)
  );
}

function compare(a: MatchBasedItem, b: MatchBasedItem) {
  if (a.point < b.point) {
    return -1;
  }
  if (a.point > b.point) {
    return 1;
  }
  // a 必須等於 b
  return 0;
}
