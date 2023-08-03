import { Direction } from '../direction.enum';
import { GameMap } from '../map';
import { Position } from '../position';
import { ReadlineService } from '../services/readline.service';
import { ReadlineValidation } from '../services/readline.validation';
import { NormalState } from '../state/normalState';
import { State } from '../state/state';
import { mapObjectType } from './mapObject.interface';
import { MoveActionCommand, MoveStrategy } from './moveStrategy';
import { Role } from './role';

export class Hero extends Role {
  readlineService = new ReadlineService();
  readlineValidation = new ReadlineValidation();
  constructor(position:Position,map: GameMap) {
    super(position,map);
    
  }

  public async act(): Promise<void> {
    await this.handleHeroAction();
  }



  public printFlag(): string {
    return this.direction;
  }

  randomDirection(): Direction {
    const rand = Math.floor(Math.random() * 4); // 生成 0 到 3 之間的隨機數字
    switch (rand) {
      case 0:
        return Direction.Up;
      case 1:
        return Direction.Down;
      case 2:
        return Direction.Left;
      case 3:
        return Direction.Right;
      default:
        throw new Error('未知的方向'); // 在不可能發生的情況下拋出錯誤
    }
  }

  public getMaxHP(): number {
    return 300;
  }

  public getType(): mapObjectType {
    return mapObjectType.hero;
  }

  public printState() {
    // 印出主角生命值及目前狀態
    console.log(`主角生命值:${this.hp}  目前狀態:${this.state.getName()}`);
  }

  public async handleHeroAction() {
    console.log('0=移動,1=攻擊');
    const action = await this.readlineService.getValidUserInput(
      '請輸入英雄行為:',
      this.readlineValidation.isValidHeroActionOperation
    );
    if (action === '0') {
      await this.state.onMove();
    } else if (action === '1') {
      await this.state.onAttack();
    }
  }

  public async handleMove(moveStrategy: MoveStrategy) {
    moveStrategy.printMoveableDirections();
    const action = await this.readlineService.getValidUserInput(
      '請輸入移動方向:',
      this.readlineValidation.isValidHeroMoveOperation
    );
    moveStrategy.handleMove(action as MoveActionCommand);
  }

  public getName(): string {
    return '英雄';
  }

  public attack() {
    console.log(this.getName() + `朝 ${this.direction} 方向發出攻擊`);
    const targets = this.findAttackTarget();
    if (targets) {
      targets.forEach((target) => {
        target.state.onDamage(1);
      });
    }
  }

  findAttackTarget() {
    if (this.direction === Direction.Up) {
      return this.map.roles
        .filter((role) => role.getType() !== mapObjectType.hero)
        .filter(
          (role) =>
            role.getPosition().x === this.position.x &&
            role.getPosition().y > this.position.y
        );
    } else if (this.direction === Direction.Down) {
      return this.map.roles
        .filter((role) => role.getType() !== mapObjectType.hero)
        .filter(
          (role) =>
            role.getPosition().x === this.position.x &&
            role.getPosition().y < this.position.y
        );
    } else if (this.direction === Direction.Left) {
      return this.map.roles
        .filter((role) => role.getType() !== mapObjectType.hero)
        .filter(
          (role) =>
            role.getPosition().x > this.position.x &&
            role.getPosition().y === this.position.y
        );
    } else if (this.direction === Direction.Right) {
      return this.map.roles
        .filter((role) => role.getType() !== mapObjectType.hero)
        .filter(
          (role) =>
            role.getPosition().x < this.position.x &&
            role.getPosition().y === this.position.y
        );
    }
  }

}
