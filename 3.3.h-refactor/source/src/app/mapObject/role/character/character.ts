import { GameMap } from "../../../gameMap";
import { EDirection } from "../../../enum/direction.enum";
import { Position } from "../../../position";
import { Role } from "../role";
import { readlineService } from "../../../services/readline.service";
import { readlineValidation } from "../../../services/readline.validation";
import { MoveActionCommand, MoveStrategy } from "../moveStrategy/moveStrategy";
import { EMapObjectSymbol } from "../../../enum/mapObjectSymbol.enum";
import { MoveNormalStrategy } from "../moveStrategy/MoveNormalStrategy";
import { AttackHandler } from "./attackStrategy/attackHandler";

export class Character extends Role {
  attackHandler: AttackHandler;
  constructor(id: string, position: Position, map: GameMap, attackHandler: AttackHandler) {
    super(id, position, map);
    this.attackHandler = attackHandler;
  }

  public getName(): string {
    return "英雄";
  }
  public getSymbol(): EMapObjectSymbol {
    return EMapObjectSymbol.character;
  }
  protected getMaxHp(): number {
    return 300;
  }

  public async attack(): Promise<void> {
    console.log(this.getName() + `朝 ${this.direction.getCurrentDirection()} 方向發出攻擊`);
    this.attackHandler.handle(this.direction.getCurrentDirection(), this.position, this.map);
  }

  public async takeTurn(): Promise<void> {
    console.log("0:移動,1:攻擊");
    const action = await readlineService.getValidUserInput(
      "請輸入英雄行為:",
      readlineValidation.isValidHeroActionOperation
    );
    if (action === "0") {
      await this.handleMove(new MoveNormalStrategy(this));
    } else if (action === "1") {
      await this.state.onAttack();
    }
  }

  public printState() {
    console.log(`${this.getName()} HP: ${this.hp}, 狀態: ${this.state.getName()}`);
  }

  public async handleMove(moveStrategy: MoveStrategy) {
    moveStrategy.printMoveableDirections();
    const action = await readlineService.getValidUserInput(
      "請輸入移動方向:",
      readlineValidation.isValidHeroMoveOperation
    );
    moveStrategy.handleMove(action as MoveActionCommand);
  }

  public printFlag() {
    return this.direction.getCurrentDirection();
  }
}
