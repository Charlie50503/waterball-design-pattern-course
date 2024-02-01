import { NumberedList } from './numberedList';
import { Position } from './position';

export class BasicNumberedList extends NumberedList {
  constructor(position: Position, content: string[]) {
    super(position, content);
  }
  protected nextNode() {
    return Number(this.currentNode) + 1;
  }
  protected getNode() {
    return '1';
  }
}
