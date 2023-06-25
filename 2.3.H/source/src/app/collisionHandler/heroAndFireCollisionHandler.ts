import { World } from "../world";
import { Fire } from "../sprite/fire";
import { Hero } from "../sprite/hero";
import { Sprite, SpriteType } from "../sprite/sprite";
import { CollisionHandler } from "./collisionHandler";

export class HeroAndFireCollisionHandler extends CollisionHandler {
  doHandling(space: World, sprite1: Sprite, sprite2: Sprite): void {
    let { hero, fire } = this.extractHeroAndFire(sprite1, sprite2);

    hero.decreaseHP(10);
    space.deleteSprite(fire);

    if (hero.isDead()) {
      space.deleteSprite(hero);
    }
    if (sprite1.type === SpriteType.Hero) {
      space.moveSpriteTo(hero.coord, fire.coord);
    }
  }

  extractHeroAndFire(sprite1: Sprite, sprite2: Sprite) {
    if (sprite1.type === SpriteType.Hero && sprite2.type === SpriteType.Fire) {
      return {
        hero: sprite1 as Hero,
        fire: sprite2 as Fire
      }
    }
    else {
      return {
        hero: sprite2 as Hero,
        fire: sprite1 as Fire
      }
    }
  }

  protected getSprite1Type(): SpriteType {
    return SpriteType.Hero;
  }

  protected getSprite2Type(): SpriteType {
    return SpriteType.Fire;
  }
}