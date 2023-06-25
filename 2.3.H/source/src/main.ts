import { FireAndFireCollisionHandler } from "./app/collisionHandler/fileAndFileCollisionHandler";
import { HeroAndFireCollisionHandler } from "./app/collisionHandler/heroAndFireCollisionHandler";
import { HeroAndHeroCollisionHandler } from "./app/collisionHandler/heroAndHeroCollisionHandler";
import { HeroAndWaterCollisionHandler } from "./app/collisionHandler/heroAndWaterCollisionHandler";
import { WaterAndFireCollisionHandler } from "./app/collisionHandler/waterAndFireCollisionHandler";
import { WaterAndWaterCollisionHandler } from "./app/collisionHandler/waterAndWaterCollisionHandler";
import { World } from "./app/world";
import { Fire } from "./app/sprite/fire";
import { Hero } from "./app/sprite/hero";
import { Water } from "./app/sprite/water";

function main() {
  const sprites = [
    new Hero(),
    new Fire(),
    new Water(),
    new Water(),
    new Fire(),
    new Hero(),
    new Fire(),
    new Water(),
    new Fire(),
    new Fire(),
  ]
  const space = new World(sprites,
    new HeroAndWaterCollisionHandler(
      new WaterAndWaterCollisionHandler(
        new WaterAndFireCollisionHandler(
          new FireAndFireCollisionHandler(
            new HeroAndFireCollisionHandler(
              new HeroAndWaterCollisionHandler(new HeroAndHeroCollisionHandler(null))))
        ))
    )
  );
  space.start();
}

main();