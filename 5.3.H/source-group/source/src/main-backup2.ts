import { ButtonWrapperStyle } from './app/buttonWrapperStyle';
import { Padding } from './app/padding';
import { Position } from './app/position';

export class Button {
  private position: Position;
  private text: string;
  private padding: Padding;
  private width: number;
  private height: number;

  private innerWidth!: number;

  private innerHeight!: number;
  private wrapperStyle: ButtonWrapperStyle;

  private lines: string[] = [];

  constructor(
    text: string,
    width: number,
    height: number,
    position: Position,
    padding: Padding,
    wrapperStyle: ButtonWrapperStyle
  ) {
    this.text = text;
    this.width = width;
    this.height = height;
    this.position = position;
    this.padding = padding;
    this.wrapperStyle = wrapperStyle;
    this.setInnerWidth(width);
    this.setInnerHeight(height);
  }

  private setInnerWidth(width: number) {
    this.innerWidth = width - 2;
  }

  private setInnerHeight(height: number) {
    this.innerHeight = height - 2;
  }

  public drawContentLine() {
    const startPosition = Math.floor((this.innerWidth - this.text.length) / 2);
    console.log(startPosition);

    const line = new Array<string>(this.innerWidth).fill(' ');
    // 填充文本
    this.text.split('').forEach((c, i) => {
      line[startPosition + i] = c;
    });

    line.unshift(this.wrapperStyle.getVerticalLine());
    line.push(this.wrapperStyle.getVerticalLine());

    // 生成並返回最終的行
    return line;
  }

  public genButton() {
    const lines = new Array<string[]>(this.innerHeight);
    // 計算文本行應該插入的位置
    const textLinePosition = Math.floor((this.innerHeight - 1) / 2);
    // 填充其餘行
    for (let i = 0; i < this.innerHeight; i++) {
      if (i === textLinePosition) {
        // 插入文本行
        lines[i] = this.drawContentLine();
      } else {
        // 插入空白或內邊距行
        lines[i] = new Array<string>(this.innerWidth).fill(' ');
        lines[i].unshift(this.wrapperStyle.getVerticalLine());
        lines[i].push(this.wrapperStyle.getVerticalLine());
      }
    }
    lines.unshift(this.drawTopLine());
    lines.push(this.drawBottomLine());
    return lines;
  }
  drawTopLine(): string[] {
    const topLine = new Array<string>(this.innerWidth).fill(
      this.wrapperStyle.getHorizontalLine()
    );
    topLine.unshift(this.wrapperStyle.getTopLeft());
    topLine.push(this.wrapperStyle.getTopRight());
    return topLine;
  }

  drawBottomLine(): string[] {
    const topLine = new Array<string>(this.innerWidth).fill(
      this.wrapperStyle.getHorizontalLine()
    );
    topLine.unshift(this.wrapperStyle.getBottomLeft());
    topLine.push(this.wrapperStyle.getBottomRight());
    return topLine;
  }
}

function main() {
  const button = new Button(
    'Hello',
    10,
    10,
    new Position(0, 0),
    new Padding(0, 0, 0, 0),
    new ButtonWrapperStyle('┌', '└', '─', '│', '┐', '┘')
  );

  console.log(123);
  console.log(
    button
      .genButton()
      .map((line) => line.join(''))
      .join('\n')
  );
}
main();
