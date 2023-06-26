import { SpriteType } from "../../sprite/sprite";
import { SameTypeCollisionHandler } from "./sameTypeCollisionHandler";

export class SameTypeWaterCollisionHandler extends SameTypeCollisionHandler {
  protected getSprite1Type(): SpriteType {
    return SpriteType.Water;
  }

  protected getSprite2Type(): SpriteType {
    return SpriteType.Water;
  }
}