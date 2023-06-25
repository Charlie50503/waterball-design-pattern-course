import { World } from "../world";
import { Sprite, SpriteType } from "../sprite/sprite";
import { CollisionHandler } from "./collisionHandler";

export class WaterAndFireCollisionHandler extends CollisionHandler {
  doHandling(space: World, sprite1: Sprite, sprite2: Sprite): void {
    space.deleteSprite(sprite1);
    space.deleteSprite(sprite2);
  }

  protected getSprite1Type(): SpriteType {
    return SpriteType.Water;
  }

  protected getSprite2Type(): SpriteType {
    return SpriteType.Fire;
  }
}