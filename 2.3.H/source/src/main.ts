import { SameTypeFireCollisionHandler } from './app/collisionHandler/sameTypeCollisionHandler/sameTypeFireCollisionHandler';
import { SameTypeHeroCollisionHandler } from './app/collisionHandler/sameTypeCollisionHandler/sameTypeHeroCollisionHandler';
import { SameTypeWaterCollisionHandler } from './app/collisionHandler/sameTypeCollisionHandler/sameTypeWaterCollisionHandler';
import { HeroAndFireCollisionHandler } from './app/collisionHandler/heroAndFireCollisionHandler';
import { HeroAndWaterCollisionHandler } from './app/collisionHandler/heroAndWaterCollisionHandler';
import { WaterAndFireCollisionHandler } from './app/collisionHandler/waterAndFireCollisionHandler';
import { World } from './app/world';
import { Fire } from './app/sprite/fire';
import { Hero } from './app/sprite/hero';
import { Water } from './app/sprite/water';

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
  ];
  const space = new World(
    sprites,
    new SameTypeFireCollisionHandler(
      new SameTypeHeroCollisionHandler(
        new SameTypeWaterCollisionHandler(
          new HeroAndFireCollisionHandler(
            new HeroAndWaterCollisionHandler(
              new WaterAndFireCollisionHandler(null)
            )
          )
        )
      )
    )
  );
  space.start();
}

main();
