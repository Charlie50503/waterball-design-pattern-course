import { Position } from './position';
import { UI } from './ui';

export class Text {
  private content: string;
  private position: Position;
  private renderedRows: string[] = [];
  private ui: UI;
  constructor(content: string, position: Position, ui: UI) {
    this.content = content;
    this.position = position;
    this.ui = ui;
    this.renderedRows = this.render();
  }
  public getRenderedRows() {
    return this.renderedRows;
  }
  render() {
    const startPosition = Math.floor(
      (this.ui.getInnerWidth() - this.content.length) / 2
    );
    const line = new Array<string>(this.ui.getInnerWidth()).fill(' ');
    // 填充文本
    this.content.split('').forEach((c, i) => {
      line[startPosition + i] = c;
    });

    // 生成並返回最終的行
    return line;
  }
}
