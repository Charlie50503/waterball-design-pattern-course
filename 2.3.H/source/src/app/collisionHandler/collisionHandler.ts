import { World } from "../world";
import { Sprite, SpriteType } from "../sprite/sprite";

export abstract class CollisionHandler {
  next: CollisionHandler | null;
  constructor(next: CollisionHandler | null) {
    this.next = next;
  }

  protected abstract doHandling(space: World, sprite1: Sprite, sprite2: Sprite): void;

  public collisionHandle(space: World, sprite1: Sprite, sprite2: Sprite) {
    if (this.match(sprite1, sprite2)) {
      this.doHandling(space, sprite1, sprite2);
    } else {
      this.next?.collisionHandle(space, sprite1, sprite2);
    }
  }

  protected abstract getSprite1Type(): SpriteType
  protected abstract getSprite2Type(): SpriteType

  protected match(sprite1: Sprite, sprite2: Sprite) {
    return (sprite1.type === this.getSprite1Type() && sprite2.type === this.getSprite2Type() ||
      sprite1.type === this.getSprite2Type() && sprite2.type === this.getSprite1Type())
  }
}