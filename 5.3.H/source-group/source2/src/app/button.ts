import { Padding } from './padding';
import { Position } from './position';
import { UI } from './ui';
import { ButtonWrapper } from './wrapper';

export abstract class Button {
  position: Position;
  content: string;
  result: string[][] = [];
  wrapper: ButtonWrapper;
  padding: Padding;
  ui!: UI;

  constructor(
    position: Position,
    content: string,
    wrapper: ButtonWrapper,
    padding: Padding
  ) {
    this.position = position;
    this.content = content;
    this.wrapper = wrapper;
    this.padding = padding;
    this.generate();
  }

  public setUI(ui: UI) {
    this.ui = ui;
  }

  public generate() {
    const lines = [];
    lines.push(this.drawTopLine());
    for (let index = 0; index < this.padding.top; index++) {
      lines.push(this.drawPadding());
    }
    var content =
      ' '.repeat(this.padding.left) +
      this.content +
      ' '.repeat(this.padding.right);
    lines.push(content.split(''));
    for (let index = 0; index < this.padding.bottom; index++) {
      lines.push(this.drawPadding());
    }

    lines.push(this.drawBottomLine());
    console.log(lines);

    this.result = lines;
  }

  public drawUI() {
    const newResult = structuredClone(this.ui.result)
    this.result.forEach((row, rowIndex) => {
      row.forEach((char, charIndex) => {
        newResult[this.position.y + rowIndex][
          this.position.x + charIndex
        ] = char;
      });
    });

    this.ui.result = newResult;
  }

  private drawPadding() {
    return (
      this.wrapper.verticalLine +
      ' '.repeat(this.padding.left) +
      ' '.repeat(this.content.length) +
      ' '.repeat(this.padding.right) +
      this.wrapper.verticalLine
    ).split('');
  }
  private drawTopLine() {
    return (
      this.wrapper.topLeft +
      this.wrapper.horizontalLine.repeat(
        this.padding.left + this.padding.right + this.content.length
      ) +
      this.wrapper.topRight
    ).split('');
  }
  private drawBottomLine() {
    return (
      this.wrapper.bottomLeft +
      this.wrapper.horizontalLine.repeat(
        this.padding.left + this.padding.right + this.content.length
      ) +
      this.wrapper.bottomRight
    ).split('');
  }
}
