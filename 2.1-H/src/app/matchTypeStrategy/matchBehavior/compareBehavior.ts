import { MatchBasedItem } from "../habitBased.interface";

export abstract class CompareBehavior {
  abstract compare(a: MatchBasedItem, b: MatchBasedItem) :1 | -1 | 0
}

export class HabitBasedCompareBehavior implements CompareBehavior {
  compare(a: MatchBasedItem, b: MatchBasedItem) {
    if (a.point > b.point) {
      return -1;
    }
    if (a.point < b.point) {
      return 1;
    }
    // a 必須等於 b
    return 0;
  }
}

export class HabitBasedReverseCompareBehavior implements CompareBehavior {
  compare(a: MatchBasedItem, b: MatchBasedItem) {
    if (a.point > b.point) {
      return 1;
    }
    if (a.point < b.point) {
      return -1;
    }
    // a 必須等於 b
    return 0;
  }
}

export class DistanceBasedCompareBehavior implements CompareBehavior {
  compare(a: MatchBasedItem, b: MatchBasedItem) {
    if (a.point > b.point) {
      return -1;
    }
    if (a.point < b.point) {
      return -1;
    }
    // a 必須等於 b
    return 0;
  }
}

export class DistanceBasedReverseCompareBehavior implements CompareBehavior {
  compare(a: MatchBasedItem, b: MatchBasedItem) {
    if (a.point > b.point) {
      return -1;
    }
    if (a.point < b.point) {
      return 1;
    }
    // a 必須等於 b
    return 0;
  }
}
