import { Individual } from "../../individual";

export abstract class CalculatePointBehavior {
  abstract calculatePoint(ownIndividual: Individual, otherIndividual: Individual): number
}

export class DistanceBehavior implements CalculatePointBehavior {

  calculatePoint(ownIndividual: Individual, otherIndividual: Individual) {
    return Math.sqrt(
      Math.pow(ownIndividual.coord.y - otherIndividual.coord.y, 2) +
      Math.pow(ownIndividual.coord.x - otherIndividual.coord.x, 2)
    );
  }
}

export class CommonHabitSizeBehavior implements CalculatePointBehavior {
  calculatePoint(
    ownIndividual: Individual,
    otherIndividual: Individual
  ) {
    return new Set(
      [...ownIndividual.habits].filter((x) => otherIndividual.habits.has(x))
    ).size;
  }
}