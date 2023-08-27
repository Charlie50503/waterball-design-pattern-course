import { EDirection } from "../../../../enum/direction.enum";
import { GameMap } from "../../../../gameMap";
import { Position } from "../../../../position";

export abstract class AttackHandler {
  protected next: AttackHandler | null = null;

  constructor(next: AttackHandler | null) {
    this.next = next;
  }
  public handle(direction: EDirection, startPosition: Position, map: GameMap) {
    if (this.match(direction)) {
      this.doHandling(startPosition, map);
    } else {
    }
  }

  protected abstract match(direction: EDirection): boolean;

  protected abstract doHandling(startPosition: Position, map: GameMap): void;
}
