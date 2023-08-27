import { Obstacle } from "./mapObject/obstacle";
import { GameMap } from "./gameMap";
import { CharacterGenerator } from "./objectGenerator/characterGenerator";
import { MonsterGenerator } from "./objectGenerator/monsterGenerator";
import { Character } from "./mapObject/role/character/character";
import { Monster } from "./mapObject/role/monster";
import { ObstacleGenerator } from "./objectGenerator/obstacleGenerator";
import { TreasureGenerator } from "./objectGenerator/treasureGenerator";
import { TreasureFactory } from "./treasureFactory";
import { ObjectGenerator } from "./objectGenerator/objectGenerator";
import { MapObject } from "./mapObject/mapObject";

export class Game {
  map: GameMap;
  monsters: Monster[];
  obstacles: Obstacle[];
  treasureFactory: TreasureFactory;
  character!: Character;
  monsterSize: number;
  obstacleSize: number;
  treasureSize: number;

  constructor(
    treasureFactory: TreasureFactory,
    map: GameMap,
    monsterSize: number,
    obstacleSize: number,
    treasureSize: number
  ) {
    this.treasureFactory = treasureFactory;
    this.map = map;
    this.monsterSize = monsterSize;
    this.obstacleSize = obstacleSize;
    this.treasureSize = treasureSize;
    this.monsters = [];
    this.obstacles = [];
  }

  public start() {
    // game init
    this.generateObjects();
    this.nextRound();
  }

  private async nextRound() {
    if (this.isGameOver()) {
      this.gameOver();
      return;
    }
    // 回合一開始
    this.map.printMap();
    this.character.printState();
    // 回合開始
    await this.executeRoundPhase(() => this.character.getState().onRoundStart());
    await this.executeRoundPhase(() =>
      this.monsters.filter((m) => !m.isDead).forEach((m) => m.getState().onRoundStart())
    );
    await this.executeRoundPhase(async () => await this.character.getState().onTurn());
    await this.executeRoundPhase(() =>
      this.monsters.filter((m) => !m.isDead).forEach((m) => m.getState().onTurn())
    );
    await this.executeRoundPhase(() => this.character.getState().onRoundEnd());
    await this.executeRoundPhase(() =>
      this.monsters.filter((m) => !m.isDead).forEach((m) => m.getState().onRoundEnd())
    );
    this.removeDeadMonsters();
    // 下一回合
    this.nextRound();
  }

  private removeDeadMonsters() {
    this.monsters.forEach((m) => {
      if (m.isDead) {
        this.map.removeObject(m.getPosition());
      }
    });

    this.monsters = this.monsters.filter((m) => !m.isDead);
  }

  private async executeRoundPhase(phaseFunction: () => void) {
    await phaseFunction();
    if (this.isGameOver()) {
      this.gameOver();
    }
  }

  private generateObjects() {
    this.generateObject(new CharacterGenerator(this.map), 1, (character: Character) => {
      this.character = character;
    });
    this.generateObject(new MonsterGenerator(this.map), this.monsterSize, (monster: Monster) => {
      this.monsters.push(monster);
    });
    this.generateObject(new TreasureGenerator(this.map, this.treasureFactory), this.treasureSize);
    this.generateObject(
      new ObstacleGenerator(this.map),
      this.obstacleSize,
      (obstacle: Obstacle) => {
        this.obstacles.push(obstacle);
      }
    );
  }

  private generateObject<T extends MapObject>(
    generator: ObjectGenerator<T>,
    size: number,
    callback?: (obj: T) => void
  ) {
    for (let index = 0; index < size; index++) {
      const obj = generator.generate();
      this.map.setObject(obj);
      if (callback) callback(obj);
    }
  }

  private isGameOver() {
    return this.monsters.length === 0 || this.character.isDead;
  }

  private gameOver() {
    if (this.monsters.length === 0) {
      console.log("恭喜英雄勝利!");
    } else if (this.character.isDead) {
      console.log("猶豫就會敗北!");
    }
  }
}
