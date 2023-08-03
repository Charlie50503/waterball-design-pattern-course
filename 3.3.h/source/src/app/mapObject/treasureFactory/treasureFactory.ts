import { Position } from '../../position';
import { Treasure } from '../treasure/treasure';

export enum TreasureType {
  SuperStar = '無敵星星 (Super Star)',
  Poison = '毒藥 (Poison)',
  AcceleratingPotion = '加速藥水 (Accelerating Potion)',
  HealingPotion = '補血罐 (Healing Potion)',
  DevilFruit = '惡魔果實 (Devil Fruit)',
  KingsRock = "王者之印 (King's Rock)",
  DokodemoDoor = '任意門 (Dokodemo Door)',
}
type TreasureCreator = (position: Position) => Treasure;

export class TreasureFactory {
  private creators = new Map<TreasureType, {
    creator: TreasureCreator,
    probability: number
  }>();

  registerTreasure(type: TreasureType, creator: TreasureCreator, probability: number) {
    this.creators.set(type, {
      creator: creator,
      probability: probability
    });
  }


  createTreasure(type: TreasureType, position: Position): Treasure {
    const creator = this.creators.get(type);
    if (!creator) {
      throw new Error(`Invalid treasure type: ${type}`);
    }
    return creator.creator(position);
  }

  getCreators(): Map<TreasureType, {
    creator: TreasureCreator,
    probability: number
  }> {
    return this.creators;
  }
}


