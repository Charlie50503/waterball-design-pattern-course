import { MapObject } from "./mapObject/mapObject";
import { Position } from "./position";

export class GameMap {
  rowSize: number;
  colSize: number;
  grid: (MapObject | null)[][];

  constructor(rowSize: number, colSize: number) {
    this.rowSize = rowSize;
    this.colSize = colSize;
    this.grid = this.generateMap(rowSize, colSize);
  }

  private generateMap(width: number, height: number) {
    var map: (MapObject | null)[][] = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(null));
    return map;
  }

  public getObject(position: Position) {
    return this.grid[position.getRow()][position.getColumn()];
  }

  public setObject(mapObject: MapObject) {
    this.grid[mapObject.getPosition().getRow()][mapObject.getPosition().getColumn()] = mapObject;
    const key = `${mapObject.getPosition().getRow()}-${mapObject.getPosition().getColumn()}`;
  }

  public removeObject(position: Position) {
    if (this.grid[position.getRow()][position.getColumn()]) {
      this.grid[position.getRow()][position.getColumn()] = null;
    } else {
      throw Error("沒找到可以刪除的物件");
    }
  }

  public isPositionOccupied(position: Position) {
    const row = position.getRow();
    const column = position.getColumn();

    // 檢查 row 和 column 是否在合理的範圍內
    if (row < 0 || row >= this.grid.length || column < 0 || column >= this.grid[row].length) {
      return false; // 或者你可以選擇拋出一個錯誤，取決於你的邏輯
    }

    const cellValue = this.grid[row][column];
    return cellValue != null;
  }

  public getRowSize() {
    return this.rowSize;
  }

  public getColumnSize() {
    return this.colSize;
  }

  public printMap() {
    const numberOfDigits = this.calculateNumberOfDigits();
    const header = this.buildHeaderRow(numberOfDigits);
    console.log(header);

    this.grid.forEach((row, rowIndex) => {
      const rowStr = this.buildRowString(row, rowIndex, numberOfDigits);
      console.log(rowStr);
    });
  }

  private calculateNumberOfDigits() {
    const maxRowIndex = this.grid.length - 1;
    const maxColIndex = this.grid[0].length - 1;
    return Math.max(maxRowIndex.toString().length, maxColIndex.toString().length);
  }

  private buildHeaderRow(numberOfDigits: number) {
    let header = " ".repeat(numberOfDigits + 1);
    this.grid[0].forEach((cell, columnIndex) => {
      const formattedIndex = columnIndex.toString().padStart(numberOfDigits, " ");
      header += formattedIndex + " ";
    });
    return header;
  }

  private buildRowString(row: (MapObject | null)[], rowIndex: number, numberOfDigits: number) {
    let rowStr = rowIndex.toString().padStart(numberOfDigits, " ") + " ";
    row.forEach((cell, columnIndex) => {
      let cellStr = cell ? cell.printFlag() : "-";
      rowStr += cellStr.padStart(numberOfDigits, " ") + " ";
    });
    return rowStr;
  }
}
