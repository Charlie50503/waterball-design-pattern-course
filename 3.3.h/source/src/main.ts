// class GameMap {
//   map: string[][]; // 存儲二維地圖

import { Game } from './app/game';
import { AcceleratingPotion } from './app/mapObject/treasure/acceleratingPotion';
import { DevilFruit } from './app/mapObject/treasure/devilFruit';
import { DokodemoDoor } from './app/mapObject/treasure/dokodemoDoor';
import { HealingPotion } from './app/mapObject/treasure/healingPotion';
import { KingsRock } from './app/mapObject/treasure/kingsRock';
import { Poison } from './app/mapObject/treasure/poison';
import { SuperStar } from './app/mapObject/treasure/superState';
import { Treasure } from './app/mapObject/treasure/treasure';
import {
  TreasureFactory,
  TreasureType,
} from './app/mapObject/treasureFactory/treasureFactory';

function main() {
  const treasureFactory = new TreasureFactory();
  treasureFactory.registerTreasure(
    TreasureType.SuperStar,
    () => new SuperStar(),
    SuperStar.PROBABILITY
  );
  treasureFactory.registerTreasure(
    TreasureType.Poison,
    () => new Poison(),
    Poison.PROBABILITY
  );
  treasureFactory.registerTreasure(
    TreasureType.AcceleratingPotion,
    () => new AcceleratingPotion(),
    AcceleratingPotion.PROBABILITY
  );
  treasureFactory.registerTreasure(
    TreasureType.HealingPotion,
    () => new HealingPotion(),
    HealingPotion.PROBABILITY
  );
  treasureFactory.registerTreasure(
    TreasureType.DevilFruit,
    () => new DevilFruit(),
    DevilFruit.PROBABILITY
  );
  treasureFactory.registerTreasure(
    TreasureType.KingsRock,
    () => new KingsRock(),
    KingsRock.PROBABILITY
  );
  treasureFactory.registerTreasure(
    TreasureType.DokodemoDoor,
    () => new DokodemoDoor(),
    DokodemoDoor.PROBABILITY
  );

  const game = new Game(
    treasureFactory,
    {
      width: 10,
      height: 10,
    },
    10,
    10,
    10
  );
  game.start();
}

main()