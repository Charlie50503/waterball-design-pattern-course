import { Position } from './../position';
import { Direction } from '../direction.enum';
import { GameMap } from '../map';
import { NormalState } from '../state/normalState';
import { State } from '../state/state';
import { MapObject, mapObjectType } from './mapObject.interface';
import { EWhenTouchedAction, GameTouch } from '../touch';
import { Treasure } from './treasure/treasure';
import { MoveStrategy } from './moveStrategy';
import { AcceleratingPotion } from './treasure/acceleratingPotion';
import { EState } from '../state/state.enum';

export abstract class Role extends MapObject {
  // map:Map
  protected direction: Direction;
  protected position!: Position;
  protected hp: number;
  public state: State;
  public isAlive: boolean = true;
  protected map: GameMap;

  constructor(position:Position, map: GameMap) {
    super(position);
    this.map = map;
    this.direction = this.randomDirection();
    // this.position = position;
    this.hp = this.getMaxHP();
    this.state = new NormalState(this);
  }

  abstract act(): Promise<void>;

  abstract getMaxHP(): number;

  abstract printFlag(): string;

  public isDead() {
    return this.hp <= 0;
  }

  public dead() {
    this.isAlive = false;
  }

  public setState(state: State) {
    
    this.state = state;
    this.state.enterState();
  }

  public move(direction: Direction) {
    const nextPosition = this.position.findNextPosition(direction);
    // ...移動角色到新的位置...

    // 檢查新的位置是否有其他的 MapObject
    const touchee = this.map.findPositionMapObject(nextPosition);

    if (touchee) {
      const touch = new GameTouch(this, touchee);
      const action = touch.onTouch();
      if (action === EWhenTouchedAction.getState) {
        const treasure = touchee as Treasure;
        treasure.onTouch(this);
        this.map.removeTreasure(treasure);
        console.log(this.getName() + `向 ${direction} 移動完成`);
        this.setDirection(direction);
        this.position.updatePosition(nextPosition);
      } else {
        console.log(this.getName(), `碰撞到 ${touchee.getName()} 不能移動`);
      }
      // 基於 action 進行一些適當的處理...
    } else {
      this.position = new Position(nextPosition.x, nextPosition.y);
      console.log(this.getName() + `向 ${direction} 移動完成`);
      this.setDirection(direction);
    }
  }



  public onHealing(heal: number) {
    console.log(`${this.getName()}補血 ${heal} 點`);
    this.hp += heal;
    if (this.hp > this.getMaxHP()) {
      this.hp = this.getMaxHP();
      console.log(`${this.getName()}已經補滿血`);
    }
  }

  // 隨機選一個方向
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

  public abstract handleMove(moveStrategy: MoveStrategy): Promise<void>;

  public getMap() {
    return this.map;
  }

  public abstract attack(): void;


  getHp() {
    return this.hp;
  }

  getDirection() {
    return this.direction;
  }

  public onDamage(damage: number): void {
    this.hp -= damage;
    console.log(`${this.getName()} 受到 ${damage} 點傷害`);
    if (this.isDead()) {
      console.log(`${this.getName()} 死亡`);
      this.dead();
    }
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }
}
