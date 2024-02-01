import { Position } from './position';
import { UI } from './ui';

export abstract class MyText {
  position: Position;
  content: string;
  result: string[] = [];

  ui!: UI;

  constructor(position: Position, content: string) {
    this.position = position;
    this.content = content;
  }
  public setUI(ui: UI) {
    this.ui = ui;
  }

  protected abstract generate(): void;

  public drawUI() {
    for (let i = 0; i < this.result.length; i++) {
      this.ui.result[this.position.y][this.position.x + i] = this.result[i];
    }
  }
}
