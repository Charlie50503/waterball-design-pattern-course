import { ETreasureType } from "./app/enum/treasureType.enum";
import { Game } from "./app/game";
import { GameMap } from "./app/gameMap";
import { AcceleratingPotion } from "./app/mapObject/treasure/acceleratingPotion";
import { DevilFruit } from "./app/mapObject/treasure/devilFruit";
import { DokodemoDoor } from "./app/mapObject/treasure/dokodemoDoor";
import { HealingPotion } from "./app/mapObject/treasure/healingPotion";
import { KingsRock } from "./app/mapObject/treasure/kingsRock";
import { Poison } from "./app/mapObject/treasure/poison";
import { SuperStar } from "./app/mapObject/treasure/superStar";
import { Position } from "./app/position";
import { TreasureFactory } from "./app/treasureFactory";

function main() {
  const treasureFactory = new TreasureFactory();
  treasureFactory.registerTreasure(
    ETreasureType.SuperStar,
    (id: string, position: Position) => new SuperStar(id, position),
    SuperStar.PROBABILITY
  );
  treasureFactory.registerTreasure(
    ETreasureType.Poison,
    (id: string, position: Position) => new Poison(id, position),
    Poison.PROBABILITY
  );
  treasureFactory.registerTreasure(
    ETreasureType.AcceleratingPotion,
    (id: string, position: Position) => new AcceleratingPotion(id, position),
    AcceleratingPotion.PROBABILITY
  );
  treasureFactory.registerTreasure(
    ETreasureType.HealingPotion,
    (id: string, position: Position) => new HealingPotion(id, position),
    HealingPotion.PROBABILITY
  );
  treasureFactory.registerTreasure(
    ETreasureType.DevilFruit,
    (id: string, position: Position) => new DevilFruit(id, position),
    DevilFruit.PROBABILITY
  );
  treasureFactory.registerTreasure(
    ETreasureType.KingsRock,
    (id: string, position: Position) => new KingsRock(id, position),
    KingsRock.PROBABILITY
  );
  treasureFactory.registerTreasure(
    ETreasureType.DokodemoDoor,
    (id: string, position: Position) => new DokodemoDoor(id, position),
    DokodemoDoor.PROBABILITY
  );

  const game = new Game(treasureFactory, new GameMap(25, 25), 20, 20, 20);
  game.start();
}

main();
