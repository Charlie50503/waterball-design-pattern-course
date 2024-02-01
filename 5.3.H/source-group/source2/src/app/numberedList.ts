import { Position } from './position';
import { UI } from './ui';

export abstract class NumberedList {
  position: Position;
  content: string[];
  currentNode: string;
  result: string[][] = [];
  ui!: UI;

  constructor(position: Position, content: string[]) {
    this.position = position;
    this.content = content;
    this.currentNode = this.getNode();
  }

  public setUI(ui: UI) {
    this.ui = ui;
  }
  public generate(): void {
    const lines: string[][] = [];
    this.content.forEach((element) => {
      const line = (this.currentNode + '. ' + element).split('');
      lines.push(line);
      this.nextNode();
    });
    this.result = lines;
  }

  drawUI() {
    this.result.forEach((row, rowIndex) => {
      row.forEach((char, charIndex) => {
        this.ui.result[this.position.y + rowIndex][
          this.position.x + charIndex
        ] = char;
      });
    });
  }
  protected abstract nextNode(): void;
  protected abstract getNode(): string;
}
