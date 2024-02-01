export class ButtonWrapperStyle {
  private topLeft: string;
  private bottomLeft: string;
  private horizontalLine: string;
  private verticalLine: string;
  private topRight: string;
  private bottomRight: string;

  constructor(
    topLeft: string,
    bottomLeft: string,
    horizontalLine: string,
    verticalLine: string,
    topRight: string,
    bottomRight: string
  ) {
    this.topLeft = topLeft;
    this.bottomLeft = bottomLeft;
    this.horizontalLine = horizontalLine;
    this.verticalLine = verticalLine;
    this.topRight = topRight;
    this.bottomRight = bottomRight;
  }

  public getTopLeft() {
    return this.topLeft;
  }

  public getBottomLeft() {
    return this.bottomLeft;
  }

  public getHorizontalLine() {
    return this.horizontalLine;
  }

  public getVerticalLine() {
    return this.verticalLine;
  }

  public getTopRight() {
    return this.topRight;
  }

  public getBottomRight() {
    return this.bottomRight;
  }

  public setTopLeft(topLeft: string) {
    this.topLeft = topLeft;
  }

  public setBottomLeft(bottomLeft: string) {
    this.bottomLeft = bottomLeft;
  }

  public setHorizontalLine(horizontalLine: string) {
    this.horizontalLine = horizontalLine;
  }

  public setVerticalLine(verticalLine: string) {
    this.verticalLine = verticalLine;
  }

  public setTopRight(topRight: string) {
    this.topRight = topRight;
  }

  public setBottomRight(bottomRight: string) {
    this.bottomRight = bottomRight;
  }
}
