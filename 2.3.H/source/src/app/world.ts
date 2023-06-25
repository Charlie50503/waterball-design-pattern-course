import { CollisionHandler } from "./collisionHandler/collisionHandler";
import { Coord } from "./coord";
import rl from "./helper/readline";
import { Sprite } from "./sprite/sprite";

export type Item = Sprite | null;

export class World {
  items: Item[] = [];
  indices: number[] = [];
  readonly spaceSize: number = 30;
  readonly maxItemSize: number = 10;
  collisionHandler!: CollisionHandler;

  constructor(sprites: Sprite[], collisionHandler: CollisionHandler) {
    this.collisionHandler = collisionHandler;
    for (let index = 0; index < this.spaceSize; index++) {
      this.items.push(null);
      this.indices.push(index);
    }
    sprites.forEach(sprite => {
      this.insert(sprite);
    })
  }

  public async start(): Promise<void> {
    try {
      this.items.forEach((item, index) => {
        if (item) {
          console.log(index, item);
        }
      })

      const inputMoveTo = await this.inputMoveTo()
      this.moveSprite(inputMoveTo.form, inputMoveTo.to);
      return this.start();
    } catch (error) {
      console.log(error);
      return this.start();
    }
  }

  private insert(sprite: Sprite) {
    if (this.indices.length === 0) {
      throw new Error('items is full');
    }

    if (this.items.length === this.maxItemSize) {
      throw new Error('items is full');
    }

    // 隨機選擇一個索引
    const randomIndex = Math.floor(Math.random() * this.indices.length);
    const arrayIndex = this.indices[randomIndex];
    sprite.coord = new Coord(arrayIndex);
    // 在陣列中放入 item
    this.items[arrayIndex] = sprite;

    // 將索引從索引陣列中移除
    this.indices.splice(randomIndex, 1);
  }


  public deleteSprite(sprite: Sprite): void {
    this.items[sprite.coord.x] = null;
    this.indices.push(sprite.coord.x);
  }


  private moveSprite(form: Coord, to: Coord): void {
    if (!this.items[form.x]) {
      console.log("沒有找到可以移動的對象")
      return
    }
    if (this.items[form.x] && this.items[to.x]) {
      this.collisionHandler.collisionHandle(this, this.items[form.x] as Sprite, this.items[to.x] as Sprite)
    } else {
      this.moveSpriteTo(form, to)
    }
  }

  public moveSpriteTo(form: Coord, to: Coord) {
    const sprite = this.items[form.x];
    if (sprite) {
      this.items[form.x] = null;
      sprite.coord.x = to.x
      this.items[to.x] = sprite;
    } else {
      throw Error("沒找到可以的移動對象")
    }


  }

  private inputMoveTo(): Promise<{ form: Coord, to: Coord }> {
    return new Promise((resolve, reject) => {
      rl.question(
        '請輸入要移動的座標 "格式為： <x1座標> <x2座標>": ',
        (input) => {
          const coords = input.split(" ");
          if (coords.length !== 2) {
            reject('輸入座標數量錯誤');
          } else if (isNaN(Number(coords[0])) || isNaN(Number(coords[1]))) {
            reject('輸入格式錯誤');
          }

          resolve({
            form: new Coord(Number(coords[0])),
            to: new Coord(Number(coords[1]))
          })
        }
      );
    });
  }
}