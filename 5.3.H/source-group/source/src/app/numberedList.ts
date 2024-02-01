import { NumberedListNode } from './numberedListNode';
import { Position } from './position';
import { UI } from './ui';

export class NumberedList {
  private position: Position;
  private contentLines: string[] = [];
  private renderedRows: string[][] = [];
  private ui: UI;

  constructor(position: Position, contentLines: string[], ui: UI) {
    this.position = position;
    this.contentLines = contentLines;
    this.ui = ui;
    this.renderedRows = this.render();
  }

  render() {
    const numberListNode = new NumberedListNode();

    return this.contentLines.map((content, index) => {
      const line = this.drawLine(content, numberListNode.getNode());
      numberListNode.nextNode();
      return line;
    });
  }

  public drawLine(content: string, node: string) {
    const newContent = node + '.' + content;

    const startPosition = Math.floor(
      (this.ui.getInnerWidth() - newContent.length) / 2
    );
    const line = new Array<string>(this.ui.getInnerWidth()).fill(' ');
    // 填充文本
    newContent.split('').forEach((c, i) => {
      line[startPosition + i] = c;
    });

    // 生成並返回最終的行
    return line;
  }
}
