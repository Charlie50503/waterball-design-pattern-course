import { Character } from "./character/character";
import { EMapObjectSymbol } from "../../enum/mapObjectSymbol.enum";
import { GameMap } from "../../gameMap";
import { Position } from "../../position";
import { MoveActionCommand, MoveStrategy } from "./moveStrategy/moveStrategy";
import { Role } from "./role";

export class Monster extends Role {
  constructor(id: string, position: Position, map: GameMap) {
    super(id, position, map);
  }

  getName(): string {
    return "怪物";
  }

  public getSymbol(): EMapObjectSymbol {
    return EMapObjectSymbol.monster;
  }

  takeTurn(): void {
    const character = this.findCharacter();
    if (character) {
      this.state.onAttack();
    } else {
      this.move(this.direction.randomDirection());
    }
  }

  // 應該把 character 移動到 map 類
  findCharacter(): Character | null {
    const row = this.position.getRow();
    const col = this.position.getColumn();
    const directions = [
      { rowIncrement: -1, colIncrement: 0 },
      { rowIncrement: 1, colIncrement: 0 },
      { rowIncrement: 0, colIncrement: -1 },
      { rowIncrement: 0, colIncrement: 1 }
    ];

    let character: Character | null = null;
    for (const direction of directions) {
      const newRow = row + direction.rowIncrement;
      const newCol = col + direction.colIncrement;
      if (
        this.map.isPositionOccupied(new Position(newRow, newCol)) &&
        this.map.grid[newRow][newCol]?.getSymbol() === EMapObjectSymbol.character
      ) {
        character = this.map.grid[newRow][newCol] as Character;
        break;
      }
    }

    return character;
  }

  attack(): void {
    console.log(this.getName(), `發出攻擊`);
    const character = this.findCharacter();
    if (character) {
      character.onDamage(50);
    } else {
      throw Error("沒找到英雄");
    }
  }

  protected getMaxHp(): number {
    return 1;
  }

  public async handleMove(moveStrategy: MoveStrategy) {
    const action = Math.random() < 0.5 ? "0" : "1";
    moveStrategy.handleMove(action as MoveActionCommand);
  }
}
