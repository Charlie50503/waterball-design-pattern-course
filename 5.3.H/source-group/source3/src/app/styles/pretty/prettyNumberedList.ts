import { NumberedList } from '../../core/numberedList';
import { Position } from '../../core/position';

export class PrettyNumberedList extends NumberedList {
  constructor(position: Position, content: string[]) {
    super(position, content);
  }
  protected nextNode() {
    return this.currentNode + "I";
  }
  protected getNode() {
    return 'I';
  }
}
