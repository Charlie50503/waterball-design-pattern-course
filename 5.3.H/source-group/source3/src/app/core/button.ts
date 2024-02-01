import { ButtonWrapper } from './../interfaces/wrapper.interface';
import { IButton } from '../interfaces/button.interface';
import { Padding } from './padding';
import { Position } from './position';
import { UI } from './ui';

export abstract class Button implements IButton {
  position: Position;
  content: string;
  padding: Padding;
  private result: string[][] = [];
  private ui!: UI;

  constructor(position: Position, content: string, padding: Padding) {
    this.position = position;
    this.content = content;
    this.padding = padding;
    this.generate();
  }

  private generate() {
    const lines = [];
    lines.push(this.drawTopLine());
    for (let index = 0; index < this.padding.top; index++) {
      lines.push(this.drawPadding());
    }
    var content =
      this.getWrapper().verticalLine +
      ' '.repeat(this.padding.left) +
      this.content +
      ' '.repeat(this.padding.right) +
      this.getWrapper().verticalLine;
    lines.push(content.split(''));
    for (let index = 0; index < this.padding.bottom; index++) {
      lines.push(this.drawPadding());
    }

    lines.push(this.drawBottomLine());
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

  private drawPadding() {
    return (
      this.getWrapper().verticalLine +
      ' '.repeat(this.padding.left) +
      ' '.repeat(this.content.length) +
      ' '.repeat(this.padding.right) +
      this.getWrapper().verticalLine
    ).split('');
  }
  private drawTopLine() {
    return (
      this.getWrapper().topLeft +
      this.getWrapper().horizontalLine.repeat(
        this.padding.left + this.padding.right + this.content.length
      ) +
      this.getWrapper().topRight
    ).split('');
  }

  private drawBottomLine() {
    return (
      this.getWrapper().bottomLeft +
      this.getWrapper().horizontalLine.repeat(
        this.padding.left + this.padding.right + this.content.length
      ) +
      this.getWrapper().bottomRight
    ).split('');
  }
  protected abstract getWrapper(): ButtonWrapper;
}
