import { World } from '../world';
import { Sprite, SpriteType } from '../sprite/sprite';
import { CollisionHandler } from './collisionHandler';

export abstract class SameTypeCollisionHandler extends CollisionHandler {
  doHandling(space: World, sprite1: Sprite, sprite2: Sprite): void {
    console.log('-------------------');
    console.log('移動失敗');
    console.log('-------------------');
  }

  protected abstract getSprite1Type(): SpriteType;

  protected abstract getSprite2Type(): SpriteType;
}

export class HeroAndHeroCollisionHandler extends SameTypeCollisionHandler {
  protected getSprite1Type() {
    return SpriteType.Hero;
  }

  protected getSprite2Type() {
    return SpriteType.Hero;
  }
}
