import { IButton } from '../interfaces/button.interface';
import { INumberedList } from '../interfaces/numberedList.interface';
import { IText } from '../interfaces/text.interface';
import { UIAbstractFactory } from './uiAbstractFactory';

export class UI {
  private width: number;
  private height: number;
  private buttons: IButton[];
  private textList: IText[];
  private numberedLists: INumberedList[];
  private readonly wrapperIcon = '.';
  private uiFactories: UIAbstractFactory[] = [];
  private currentUIFactory: UIAbstractFactory | null = null;
  public result: string[][] = [];

  constructor(
    width: number,
    height: number,
    buttons: IButton[],
    textList: IText[],
    numberedLists: INumberedList[]
  ) {
    this.width = width;
    this.height = height;
    this.buttons = buttons;
    this.textList = textList;
    this.numberedLists = numberedLists;
  }

  public registerFactory(factory: UIAbstractFactory) {
    this.uiFactories.push(factory);
    return this;
  }

  public setAsciiTheme(style: string) {
    const uiFactory = this.uiFactories.find(
      (uiFactory) => uiFactory.name === style
    );
    if (!uiFactory) {
      throw Error('uiFactory not found');
    }

    this.currentUIFactory = uiFactory;
    return this;
  }

  public draw() {
    // 首先畫出 ui 整個底稿
    // 然後畫出 components 的位置
    // loop ui 的整個row跟cell
    // 判斷 如果是 該 row index 跟 cell index 符合 component 的 position 就把 component 的 content 替換掉原先的 row 跟 cell
    //　補齊邊框樣式
    // var result = []
    this.drawDraft(this.width, this.height);
    this.buttons.forEach((button) => {
      this.currentUIFactory
        ?.createButton(button.position, button.content, button.padding)
        .setUI(this)
        .drawUI();
    });
    this.textList.forEach((text) => {
      this.currentUIFactory
        ?.createText(text.position, text.content)
        .setUI(this)
        .drawUI();
    });
    this.numberedLists.forEach((numberedList) => {
      this.currentUIFactory
        ?.createNumberedList(numberedList.position, numberedList.content)
        .setUI(this)
        .drawUI();
    });
    this.drawDivideLine(0);
    this.drawDivideLine(this.height);
    this.drawWrapper();

    console.log(this.result.map((row) => row.join('')).join('\n'));
  }

  private drawDraft(width: number, height: number) {
    this.result = Array.from({ length: height }, () =>
      new Array(width).fill(' ')
    );
  }
  private drawDivideLine(y: number) {
    this.result[y] = this.wrapperIcon.repeat(this.width).split('');
  }
  private drawWrapper() {
    this.result = this.result.reduce((ary: string[][], row) => {
      const newRow = [...row];
      newRow[0] = this.wrapperIcon;
      newRow[row.length - 1] = this.wrapperIcon;
      ary.push(newRow);
      return ary;
    }, []);
  }
}
