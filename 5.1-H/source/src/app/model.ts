import * as fs from 'fs';
import * as util from 'util';
const readFile = util.promisify(fs.readFile);

export class Model {
  private matrix: number[][] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public async initialize(filePath: string) {
    const fileString = await readFile(filePath, 'utf-8');
    fileString.split('\n').forEach((line) => {
      this.matrix.push(line.split(' ').map(Number));
    });
  }

  public calculate(vector: number[]) {
    if (vector.length > 1000) {
      throw Error('向量值超過可以處理限制');
    }

    return this.matrix.map((row) => {
      const rowResult = vector.reduce((accumulator, currentValue) => {
        row.forEach((item) => {
          accumulator += item * currentValue;
        });

        return accumulator;
      }, 0);
      return rowResult;
    });
  }

  getName() {
    return this.name;
  }
}
