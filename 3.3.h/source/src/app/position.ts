import { Direction } from "./direction.enum";

export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }


  equals(other: Position): boolean {
    return this.x === other.x && this.y === other.y;
  }

  public findNextPosition(direction: Direction) {
    let x = this.x;
    let y = this.y;
    switch (direction) {
      case Direction.Up:
        y = y - 1
        break;
      case Direction.Down:
        y = y + 1
        break;
      case Direction.Left:
        x = x - 1
        break;
      case Direction.Right:
        x = x + 1
        break;
    }
    return new Position(x, y);
  }

  updatePosition(position: Position) {
    this.x = position.x;
    this.y = position.y;
  }
}