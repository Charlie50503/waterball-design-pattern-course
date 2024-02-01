import { NumberedList } from '../../core/numberedList';
import { Position } from '../../core/position';

export class BasicNumberedList extends NumberedList {
  constructor(position: Position, content: string[]) {
    super(position, content);
  }
  protected nextNode() {
    return (Number(this.currentNode) + 1).toString();
  }
  protected getNode() {
    return '1';
  }
}
