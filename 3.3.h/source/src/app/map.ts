import { MapObject } from './mapObject/mapObject.interface';
import { Role } from './mapObject/role';
import { Treasure } from './mapObject/treasure/treasure';
import { Position } from './position';

export class GameMap {
  width: number;
  height: number;
  map: (MapObject | null)[][];

  otherMapObjects: MapObject[] = []; // 不包含會動的物件
  roles: Role[] = []; // 會動的物件

  monsterSize!: number;
  treasureSize: number = 0;
  obstacleSize!: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.map = this.generateMap(width, height);
  }

  private generateMap(width: number, height: number) {
    var map: (MapObject | null)[][] = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(null));
    return map;
  }

  isPositionEmpty(position: Position) {
    return (
      this.otherMapObjects.find(
        (mapObject) =>
          mapObject.getPosition().equals(position)
      ) === undefined &&
      this.roles.find(
        (mapObject) =>
          mapObject.getPosition().equals(position)
      ) === undefined
    );
  }

  findPositionMapObject(position: Position) {
    const mapObject = this.otherMapObjects.find((mapObject) =>
      mapObject.getPosition().equals(position)
    );
    if (mapObject) {
      return mapObject;
    }
    const role = this.roles.find((mapObject) =>
      mapObject.getPosition().equals(position)
    );
    if (role) {
      return role;
    }
    return undefined;
  }

  addRole(role: Role) {
    this.roles.push(role);
  }

  addOtherMapObject(object: MapObject) {
    this.otherMapObjects.push(object);
  }

  removeDeadRole() {
    this.roles = this.roles.filter((role) => role.isAlive);
  }

  printMap() {
    let rowIndexes = "  "
    this.map[0].forEach((cell, columnIndex) => {
      rowIndexes += columnIndex + " ";
    });
    console.log(rowIndexes);
    this.map.forEach((row, rowIndex) => {
      let rowStr = rowIndex + ' ';
      row.forEach((cell, columnIndex) => {
        // 若該格子有角色，則先印出角色
        let mapObjectInCell = this.findPositionMapObject(
          new Position(columnIndex, rowIndex)
        );
        if (mapObjectInCell) {
          rowStr += mapObjectInCell.printFlag() + ' ';
        }
        // 若該格子什麼都沒有，則印出空格
        else {
          rowStr += '- ';
        }
      });
      console.log(rowStr);
    });
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  removeTreasure(treasure: Treasure) {
    this.otherMapObjects = this.otherMapObjects.filter((mapObject) => {
      return !mapObject.getPosition().equals(treasure.getPosition());
    })
  }
}
