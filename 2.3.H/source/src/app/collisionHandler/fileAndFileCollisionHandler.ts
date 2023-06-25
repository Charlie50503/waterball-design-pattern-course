import { World } from "../world";
import { Sprite, SpriteType } from "../sprite/sprite";
import { CollisionHandler } from "./collisionHandler";

export class FireAndFireCollisionHandler extends CollisionHandler {

  doHandling(space: World, sprite1: Sprite, sprite2: Sprite): void {
    console.log("-------------------");
    console.log("Fire 碰撞到 Fire");
    console.log("移動失敗");
    console.log("-------------------");
  }

  protected match(sprite1: Sprite, sprite2: Sprite): boolean {
    return sprite1.type === SpriteType.Fire && sprite2.type === SpriteType.Fire;
  }

  protected getSprite1Type(): SpriteType {
    return SpriteType.Fire;
  }

  protected getSprite2Type(): SpriteType {
    return SpriteType.Fire;
  }
}