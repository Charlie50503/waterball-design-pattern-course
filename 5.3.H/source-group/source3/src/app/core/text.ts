import { IText } from '../interfaces/text.interface';
import { Position } from './position';
import { UI } from './ui';

export abstract class MyText implements IText {
  position: Position;
  content: string;
  protected result: string[] = [];
  private ui!: UI;

  constructor(position: Position, content: string) {
    this.position = position;
    this.content = content;
    this.generate();
  }

  protected abstract generate(): void;

  public setUI(ui: UI) {
    this.ui = ui;
    return this;
  }
  public drawUI() {
    const newResult = structuredClone(this.ui.result);
    for (let i = 0; i < this.result.length; i++) {
      newResult[this.position.y][this.position.x + i] = this.result[i];
    }
    this.ui.result = newResult;
  }
}
