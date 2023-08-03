import { Position } from './app/position';
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
    (position: Position) => new SuperStar(position),
    SuperStar.PROBABILITY
  );
  treasureFactory.registerTreasure(
    TreasureType.Poison,
    (position: Position) => new Poison(position),
    Poison.PROBABILITY
  );
  treasureFactory.registerTreasure(
    TreasureType.AcceleratingPotion,
    (position: Position) => new AcceleratingPotion(position),
    AcceleratingPotion.PROBABILITY
  );
  treasureFactory.registerTreasure(
    TreasureType.HealingPotion,
    (position: Position) => new HealingPotion(position),
    HealingPotion.PROBABILITY
  );
  treasureFactory.registerTreasure(
    TreasureType.DevilFruit,
    (position: Position) => new DevilFruit(position),
    DevilFruit.PROBABILITY
  );
  treasureFactory.registerTreasure(
    TreasureType.KingsRock,
    (position: Position) => new KingsRock(position),
    KingsRock.PROBABILITY
  );
  treasureFactory.registerTreasure(
    TreasureType.DokodemoDoor,
    (position: Position) => new DokodemoDoor(position),
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