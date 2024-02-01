import { Button } from './button';

export class UI {
  private readonly wrapperIcon: string = '・';
  private width: number;
  private height: number;
  private topButton: Button;
  private content: string;
  private confiromButtons: Button[] = [];
  private bottomList: string;

  private innerWidth!: number;
  private innerHeight!: number;

  constructor(
    width: number,
    height: number,
    topButton: Button,
    bottomList: string,
    content: string
  ) {
    this.width = width;
    this.height = height;
    this.topButton = topButton;
    this.content = content;
    this.bottomList = bottomList;
    this.innerWidth = width - 2;
    this.innerHeight = height - 2;
  }

  public getInnerWidth() {
    return this.innerWidth;
  }

  public getInnerHeight() {
    return this.innerHeight;
  }
}
