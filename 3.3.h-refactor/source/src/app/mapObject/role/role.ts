import { Position } from "./../../position";
import { Normal } from "../../state/normal";
import { State } from "../../state/state";
import { MapObject } from "../mapObject";
import { EDirection } from "../../enum/direction.enum";
import { GameMap } from "../../gameMap";
import { MoveStrategy } from "./moveStrategy/moveStrategy";
import { Direction } from "../../direction";
import { EMapObjectSymbol } from "../../enum/mapObjectSymbol.enum";
import { Treasure } from "../treasure/treasure";

export abstract class Role extends MapObject {
  protected hp: number;
  protected state: State;
  public isDead: boolean = false;
  protected map: GameMap;
  protected direction: Direction;
  constructor(id: string, position: Position, map: GameMap) {
    super(id, position);
    this.map = map;
    this.hp = this.getMaxHp();
    this.state = new Normal(this);
    this.direction = new Direction();
    this.direction.setCurrentDirection(this.direction.randomDirection());
  }

  public abstract getName(): string;
  public abstract attack(): void;
  public abstract takeTurn(): void;
  protected abstract getMaxHp(): number;

  public abstract handleMove(moveStrategy: MoveStrategy): Promise<void>;

  public onDamage(damage: number) {
    console.log(`${this.getName()}受到 ${damage} 點傷害`);
    this.hp -= damage;

    if (this.hp <= 0) {
      this.dead();
      console.log(`${this.getName()} 死亡!`);
    }
  }

  public onHealing(heal: number) {
    this.hp += heal;
    console.log(`${this.getName()} 恢復了${heal}HP`);
    if (this.hp > this.getMaxHp()) {
      console.log(`${this.getName()} 已經滿血`);
      this.hp = this.getMaxHp();
    }
  }

  public setState(state: State) {
    this.state = state;
  }

  public getState(): State {
    return this.state;
  }

  protected dead() {
    this.isDead = true;
  }

  public move(direction: EDirection) {
    this.direction.setCurrentDirection(direction);
    const nextPosition = this.position.findNextPosition(direction);
    if (
      nextPosition.getColumn() > this.map.getColumnSize() - 1 ||
      nextPosition.getRow() > this.map.getRowSize() - 1 ||
      nextPosition.getColumn() < 0 ||
      nextPosition.getRow() < 0
    ) {
      console.log("已經到邊界了不可以在移動");
      return;
    }

    const mapObject = this.map.grid[nextPosition.getRow()][nextPosition.getColumn()];
    if (mapObject && mapObject.getSymbol() === EMapObjectSymbol.treasure) {
      const treasure = mapObject as Treasure;
      treasure.onTouch(this);
    } else if (mapObject !== null) {
      console.log("碰撞到物件了不可以在移動");
      return;
    }
    console.log(this.getName(), "移動成功");

    this.updatePosition(nextPosition, direction);
  }

  public updatePosition(nextPosition: Position, direction: EDirection) {
    this.map.grid[this.position.getRow()][this.position.getColumn()] = null;
    this.map.grid[nextPosition.getRow()][nextPosition.getColumn()] = this;
    this.position.updatePosition(nextPosition);
  }

  public getMap() {
    return this.map;
  }

  public getDirection(): EDirection {
    return this.direction.getCurrentDirection();
  }
}
