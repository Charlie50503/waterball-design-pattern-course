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
    while (this.isGameOver()) {
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
    const hero = new Hero(this.map);
    const position = this.generatePosition(mapWidth, mapHeight);
    hero.setPosition(position.x, position.y);
    return hero;
  }

  private generateMonster(mapWidth: number, mapHeight: number) {
    const monster = new Monster(this.map);
    const position = this.generatePosition(mapWidth, mapHeight);
    monster.setPosition(position.x, position.y);
    return monster;
  }

  private generateObstacle(mapWidth: number, mapHeight: number) {
    const obstacle = new Obstacle();
    const position = this.generatePosition(mapWidth, mapHeight);
    obstacle.setPosition(position.x, position.y);
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
      const treasure = treasureFactory.createTreasure(treasureItem.type);
      const position = this.generatePosition(mapSize.width, mapSize.height);
      treasure.setPosition(position.x, position.y);
      return treasure;
    } else {
      throw Error('沒有生成任何物品');
    }
  }

  private generatePosition(width: number, height: number): Position {
    const position = new Position(this.getRandomNumber(width),this.getRandomNumber(height))
    console.log(position);

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
