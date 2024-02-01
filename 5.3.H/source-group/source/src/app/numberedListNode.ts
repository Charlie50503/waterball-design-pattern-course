export class NumberedListNode {
  private currentNode = 0;

  constructor() {}

  getNode() {
    return String(this.currentNode + 1);
  }

  nextNode() {
    this.currentNode++;
    return this;
  }
}
