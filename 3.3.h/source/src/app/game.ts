import { GameMap } from './map';
import { Hero } from './mapObject/hero';
import { Monster } from './mapObject/monster';
import { Obstacle } from './mapObject/obstacle';
import { Treasure } from './mapObject/treasure/treasure';
import {
  TreasureFactory,
  TreasureType,
} from './mapObject/treasureFactory/treasureFactory';
import { Position } from './position';
import { Round } from './round';
import { Erupting } from './state/erupting';
import { Healing } from './state/healing';
import { Invincible } from './state/invincible';
import { Orderless } from './state/orderless';
import { Poisoned } from './state/poisoned';
import { Stockpile } from './state/stockpile';
type TreasureItem = {
  type: TreasureType;
  range: [number, number];
};
export class Game {
  treasureFactory: TreasureFactory;
  map!: GameMap;

  constructor(
    treasureFactory: TreasureFactory,
    mapSize: { width: number; height: number },
    monsterSize: number,
    obstacleSize: number,
    treasureSize: number
  ) {
    this.treasureFactory = treasureFactory;
    this.map = new GameMap(mapSize.width, mapSize.height);
    this.map.addRole(this.generateHero(mapSize.width, mapSize.height));
    for (let index = 0; index < monsterSize; index++) {
      this.map.addRole(this.generateMonster(mapSize.width, mapSize.height));
    }
    for (let index = 0; index < obstacleSize; index++) {
      this.map.addOtherMapObject(
        this.generateObstacle(mapSize.width, mapSize.height)
      );
    }
    const creators = treasureFactory.getCreators();

    let items: TreasureItem[] = [];
    let sum = 0;
    creators.forEach((value, key) => {
      const probability = value.probability;
      const range: [number, number] = [sum, sum + probability];
      items.push({
        type: key,
        range: range,
      });
      sum += probability;
    });

    for (let index = 0; index < treasureSize; index++) {
      this.map.addOtherMapObject(
        this.generateTreasure(treasureFactory, items, mapSize)
      );
    }
  }

  public async start() {
    while (!this.isGameOver()) {
      this.map.printMap()
      const round = new Round(this.map);
      await round.start();
    }
    this.gameOver();
  }

  private isGameOver() {
    return this.isHeroFailed() || this.isHeroWin();
  }

  private isHeroFailed() {
    return this.map.roles.every((role) => role instanceof Hero === false);
  }

  private isHeroWin() {
    return this.map.roles.length === 1 && this.map.roles[0] instanceof Hero;
  }

  private gameOver() {
    if (this.isHeroWin()) {
      console.log('恭喜英雄勝利!');
    } else if (this.isHeroFailed()) {
      console.log('猶豫就會敗北!');
    }
  }

  private generateHero(mapWidth: number, mapHeight: number) {
    const position = this.generatePosition(mapWidth, mapHeight);
    const hero = new Hero(position, this.map);
    return hero;
  }

  private generateMonster(mapWidth: number, mapHeight: number) {
    const position = this.generatePosition(mapWidth, mapHeight);
    const monster = new Monster(position, this.map);
    return monster;
  }

  private generateObstacle(mapWidth: number, mapHeight: number) {
    const position = this.generatePosition(mapWidth, mapHeight);
    const obstacle = new Obstacle(position);
    return obstacle;
  }

  private generateTreasure(
    treasureFactory: TreasureFactory,
    treasureItems: TreasureItem[],
    mapSize: { width: number; height: number }
  ): Treasure {
    const random = Math.random();
    const treasureItem = treasureItems.find((item) => {
      return item.range && random >= item.range[0] && random < item.range[1];
    });
    if (treasureItem) {
      const position = this.generatePosition(mapSize.width, mapSize.height);
      const treasure = treasureFactory.createTreasure(treasureItem.type, position);
      return treasure;
    } else {
      throw Error('沒有生成任何物品');
    }
  }

  private generatePosition(width: number, height: number): Position {
    const position = new Position(this.getRandomNumber(width), this.getRandomNumber(height))

    if (this.map.isPositionEmpty(position)) {
      return position;
    } else {
      return this.generatePosition(width, height);
    }
  }

  private getRandomNumber(size: number) {
    return Math.floor(Math.random() * size);
  }
}
