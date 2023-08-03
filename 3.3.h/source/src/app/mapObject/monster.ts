import { GameMap } from '../map';
import { Position } from '../position';
import { NormalState } from '../state/normalState';
import { State } from '../state/state';
import { mapObjectType } from './mapObject.interface';
import { MoveActionCommand, MoveStrategy } from './moveStrategy';
import { Role } from './role';

export class Monster extends Role {
  constructor(map: GameMap) {
    super(map);
  }

  async act(): Promise<void> {
    if (this.isHeroBeside()) {
      this.state.onAttack();
    } else {
      this.move(this.randomDirection());
    }
  }

  public attack(){
    const hero = this.findHero();
    hero?.state.onDamage(50);
  }


  public async handleMove(moveStrategy: MoveStrategy): Promise<void> {
    moveStrategy.printMoveableDirections();
    const action = Math.random() < 0.5 ? '0' : '1';
    moveStrategy.handleMove(action as MoveActionCommand);
  }

  findHero(): Role | undefined {
    const hero = this.map.roles.find(
      (role) => role.getType() === mapObjectType.hero
    );
    return hero;
  }

  isHeroBeside(): boolean {
    const hero = this.findHero();
    if (!hero) return false;

    const heroPosition = hero.getPosition();
    const deltaX = Math.abs(heroPosition.x - this.position.x);
    const deltaY = Math.abs(heroPosition.y - this.position.y);

    // 如果英雄在當前物件的上下左右四個方向之一，返回 true
    if ((deltaX === 0 && deltaY === 1) || (deltaX === 1 && deltaY === 0)) {
      return true;
    }

    return false;
  }

  onDamage(damage: number): void {}

  printFlag(): string {
    return 'M';
  }

  getMaxHP(): number {
    return 1;
  }

  getType(): mapObjectType {
    return mapObjectType.monster;
  }

  public getName(): string {
    return '怪物';
  }
}
