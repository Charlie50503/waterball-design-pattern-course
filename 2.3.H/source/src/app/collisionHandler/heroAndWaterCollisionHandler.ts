import { World } from "../world";
import { Hero } from "../sprite/hero";
import { Sprite, SpriteType } from "../sprite/sprite";
import { Water } from "../sprite/water";
import { CollisionHandler } from "./collisionHandler";

export class HeroAndWaterCollisionHandler extends CollisionHandler {

  doHandling(space: World, sprite1: Sprite, sprite2: Sprite): void {
    let { hero, water } = this.extractHeroAndFire(sprite1, sprite2);

    hero.increaseHP(10);
    space.deleteSprite(water);

    if (sprite1.type === SpriteType.Hero) {
      space.moveSpriteTo(hero.coord, water.coord);
    }
  }


  extractHeroAndFire(sprite1: Sprite, sprite2: Sprite) {
    if (sprite1.type === SpriteType.Hero && sprite2.type === SpriteType.Water) {
      return {
        hero: sprite1 as Hero,
        water: sprite2 as Water
      }
    }
    else {
      return {
        hero: sprite2 as Hero,
        water: sprite1 as Water
      }
    }
  }

  protected getSprite1Type(): SpriteType {
    return SpriteType.Hero;
  }

  protected getSprite2Type(): SpriteType {
    return SpriteType.Water;
  }
}