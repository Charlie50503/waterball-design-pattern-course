import { ReadlineService } from './../services/readline.service';
import { Direction } from '../direction.enum';
import { Role } from './role';

export type MoveActionCommand = '0' | '1' | '2' | '3';

export abstract class MoveStrategy {
  protected readlineService = new ReadlineService();
  protected role: Role;
  constructor(role: Role) {
    this.role = role;
  }
  public abstract printMoveableDirections(): void;
  public abstract handleMove(action: MoveActionCommand): void;
}

export class MoveNormalStrategy extends MoveStrategy {
  printMoveableDirections() {
    console.log(`0=${Direction.Up}`);
    console.log(`1=${Direction.Down}`);
    console.log(`2=${Direction.Left}`);
    console.log(`3=${Direction.Right}`);
  }

  handleMove(action: MoveActionCommand) {
    if (action === '0') {
      this.role.move(Direction.Up);
    } else if (action === '1') {
      this.role.move(Direction.Down);
    }
    if (action === '2') {
      this.role.move(Direction.Left);
    } else if (action === '3') {
      this.role.move(Direction.Right);
    } else {
      throw Error('不支援操作');
    }
  }
}

export class MoveLeftRightStrategy extends MoveStrategy {
  printMoveableDirections() {
    console.log(`1=${Direction.Left}`);
    console.log(`2=${Direction.Right}`);
  }

  handleMove(action: MoveActionCommand) {
    if (action === '1') {
      this.role.move(Direction.Left);
    } else if (action === '2') {
      this.role.move(Direction.Right);
    } else {
      throw Error('不支援操作');
    }
  }
}

export class MoveUpDownStrategy extends MoveStrategy {
  printMoveableDirections() {
    console.log(`0=${Direction.Up}`);
    console.log(`1=${Direction.Down}`);
  }

  handleMove(action: MoveActionCommand) {
    if (action === '0') {
      this.role.move(Direction.Up);
    } else if (action === '1') {
      this.role.move(Direction.Down);
    } else {
      throw Error('不支援操作');
    }
  }
}
