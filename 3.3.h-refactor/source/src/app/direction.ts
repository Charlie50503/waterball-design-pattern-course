import { EDirection } from "./enum/direction.enum";
export class Direction {
  private currentDirection!: EDirection;

  constructor() {}

  public randomDirection(): EDirection {
    const directions = [EDirection.Up, EDirection.Down, EDirection.Left, EDirection.Right];
    const randIndex = Math.floor(Math.random() * directions.length);
    return directions[randIndex];
  }

  public setCurrentDirection(direction: EDirection) {
    this.currentDirection = direction;
  }

  public getCurrentDirection(): EDirection {
    return this.currentDirection;
  }
}
