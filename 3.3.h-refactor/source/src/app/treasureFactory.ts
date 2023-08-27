import { ETreasureType } from "./enum/treasureType.enum";
import { Treasure } from "./mapObject/treasure/treasure";
import { Position } from "./position";

export type TreasureParams = {
  id: string;
  position: Position;
};
type TreasureCreator = (id: string, position: Position) => Treasure;
export class TreasureFactory {
  private creators = new Map<
    ETreasureType,
    {
      creator: TreasureCreator;
      PROBABILITY: number;
    }
  >();
  registerTreasure(type: ETreasureType, creator: TreasureCreator, PROBABILITY: number) {
    this.creators.set(type, {
      creator: creator,
      PROBABILITY: PROBABILITY
    });
  }

  createTreasure(type: ETreasureType, params: TreasureParams): Treasure {
    const creator = this.creators.get(type);
    if (!creator) {
      throw new Error(`Invalid treasure type: ${type}`);
    }
    return creator.creator(params.id, params.position);
  }

  getCreators(): Map<
    ETreasureType,
    {
      creator: TreasureCreator;
      PROBABILITY: number;
    }
  > {
    return this.creators;
  }
}
