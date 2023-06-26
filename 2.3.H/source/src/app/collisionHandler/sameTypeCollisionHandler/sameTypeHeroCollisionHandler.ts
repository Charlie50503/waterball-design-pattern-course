import { SpriteType } from '../../sprite/sprite';
import { SameTypeCollisionHandler } from './sameTypeCollisionHandler';

export class SameTypeHeroCollisionHandler extends SameTypeCollisionHandler {
  protected getSprite1Type() {
    return SpriteType.Hero;
  }

  protected getSprite2Type() {
    return SpriteType.Hero;
  }
}
