export class Padding {
  private top: number;
  private down: number;
  private left: number;
  private right: number;

  constructor(top: number, down: number, left: number, right: number) {
    this.top = top;
    this.down = down;
    this.left = left;
    this.right = right;
  }

  public getTop() {
    return this.top;
  }

  public getDown() {
    return this.down;
  }

  public getLeft() {
    return this.left;
  }

  public getRight() {
    return this.right;
  }

  public setTop(top: number) {
    this.top = top;
  }

  public setDown(down: number) {
    this.down = down;
  }

  public setLeft(left: number) {
    this.left = left;
  }

  public setRight(right: number) {
    this.right = right;
  }
}
