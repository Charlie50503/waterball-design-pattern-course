import { SpriteType } from "../../sprite/sprite";
import { SameTypeCollisionHandler } from "./sameTypeCollisionHandler";

export class SameTypeFireCollisionHandler extends SameTypeCollisionHandler {
  protected getSprite1Type(): SpriteType {
    return SpriteType.Fire;
  }

  protected getSprite2Type(): SpriteType {
    return SpriteType.Fire;
  }
}