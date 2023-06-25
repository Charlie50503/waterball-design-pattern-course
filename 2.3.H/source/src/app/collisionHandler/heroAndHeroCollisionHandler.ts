import { World } from "../world";
import { Sprite, SpriteType } from "../sprite/sprite";
import { CollisionHandler } from "./collisionHandler";

export class HeroAndHeroCollisionHandler extends CollisionHandler {


  doHandling(space: World, sprite1: Sprite, sprite2: Sprite): void {
    console.log("-------------------");
    console.log("Hero 碰撞到 Hero");
    console.log("移動失敗");
    console.log("-------------------");
  }


  protected getSprite1Type(): SpriteType {
    return SpriteType.Hero;
  }

  protected getSprite2Type(): SpriteType {
    return SpriteType.Hero;
  }
}