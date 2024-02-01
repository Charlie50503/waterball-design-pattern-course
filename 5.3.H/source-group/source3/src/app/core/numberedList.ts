import { INumberedList } from '../interfaces/numberedList.interface';
import { Position } from './position';
import { UI } from './ui';

export abstract class NumberedList implements INumberedList {
  position: Position;
  content: string[];
  protected currentNode: string;
  private result: string[][] = [];
  private ui!: UI;

  constructor(position: Position, content: string[]) {
    this.position = position;
    this.content = content;
    this.currentNode = this.getNode();
    this.generate();
  }
  private generate(): void {
    const lines: string[][] = [];
    this.content.forEach((element) => {
      const line = (this.currentNode + '. ' + element).split('');
      lines.push(line);
      this.currentNode = this.nextNode();
    });
    this.result = lines;
  }

  public setUI(ui: UI) {
    this.ui = ui;
    return this;
  }

  public drawUI() {
    const newResult = structuredClone(this.ui.result);
    this.result.forEach((row, rowIndex) => {
      row.forEach((char, charIndex) => {
        newResult[this.position.y + rowIndex][this.position.x + charIndex] =
          char;
      });
    });
    this.ui.result = newResult;
  }
  protected abstract nextNode(): string;
  protected abstract getNode(): string;
}
