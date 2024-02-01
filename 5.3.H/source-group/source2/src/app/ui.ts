import { Button } from './button';
import { NumberedList } from './numberedList';
import { MyText } from './text';

export class UI {
  private width: number;
  private height: number;
  public result: string[][] = [];
  private buttons: Button[];
  private textList: MyText[];
  private numberedLists: NumberedList[];
  private readonly wrapperIcon = '・';

  constructor(
    width: number,
    height: number,
    buttons: Button[],
    textList: MyText[],
    numberedLists: NumberedList[]
  ) {
    this.width = width;
    this.height = height;
    this.buttons = buttons;
    this.buttons.forEach((button) => button.setUI(this));
    this.textList = textList;
    this.textList.forEach((text) => text.setUI(this));
    this.numberedLists = numberedLists;
    this.numberedLists.forEach((numberedList) => numberedList.setUI(this));
  }
  draw() {
    // 首先畫出 ui 整個底稿
    // 然後畫出 components 的位置
    // loop ui 的整個row跟cell
    // 判斷 如果是 該 row index 跟 cell index 符合 component 的 position 就把 component 的 content 替換掉原先的 row 跟 cell
    //　補齊邊框樣式
    // var result = []
    this.drawDraft(this.width, this.height);

    this.buttons.forEach((button) => button.drawUI());
    this.textList.forEach((text) => text.drawUI());
    this.numberedLists.forEach((numberedList) => numberedList.drawUI());
    this.drawDivideLine(0);
    this.drawDivideLine(this.height);
    this.drawWrapper();
    // console.log(this.result);

    console.log(this.result.map((row) => row.join('')).join('\n'));
  }

  drawDraft(width: number, height: number) {
    this.result = Array.from({ length: height }, () => new Array(width).fill('　'));
  }
  drawDivideLine(y: number) {
    this.result[y] = this.wrapperIcon.repeat(this.width).split('');
  }
  drawWrapper() {
    this.result = this.result.reduce((ary: string[][], row) => {
      const newRow = [...row];
      newRow[0] = this.wrapperIcon;
      newRow[row.length - 1] = this.wrapperIcon;
      ary.push(newRow);
      return ary;
    }, []);
  }
}
