import { ETreasureType } from "../enum/treasureType.enum";
import { GameMap } from "../gameMap";
import { Treasure } from "../mapObject/treasure/treasure";
import { Position } from "../position";
import { TreasureFactory } from "../treasureFactory";
import { ObjectGenerator } from "./objectGenerator";
type TreasureItem = {
  type: ETreasureType;
  range: [number, number];
};

export class TreasureGenerator extends ObjectGenerator<Treasure> {
  treasureFactory: TreasureFactory;
  constructor(map: GameMap, treasureFactory: TreasureFactory) {
    super(map);
    this.treasureFactory = treasureFactory;
  }
  public generateObject(id: string, position: Position): Treasure {
    const treasureItems = this.buildTreasureItems();
    const selectedTreasureItem = this.randomTreasureItem(treasureItems);
    return this.treasureFactory.createTreasure(selectedTreasureItem.type, {
      id: id,
      position: position
    });
  }
  private buildTreasureItems(): TreasureItem[] {
    let sum = 0;
    return Array.from(this.treasureFactory.getCreators()).reduce((items, [type, creator]) => {
      const range: [number, number] = [sum, sum + creator.PROBABILITY];
      sum += creator.PROBABILITY;
      return items.concat({ type, range });
    }, [] as TreasureItem[]);
  }

  private randomTreasureItem(treasureItems: TreasureItem[]): TreasureItem {
    const random = Math.random();
    const treasureItem = treasureItems.find(
      (item) => random >= item.range[0] && random < item.range[1]
    );
    if (!treasureItem) {
      throw Error("沒有生成任何物品");
    }
    return treasureItem;
  }
}
