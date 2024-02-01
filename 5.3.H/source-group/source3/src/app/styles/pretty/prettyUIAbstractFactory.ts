import { Padding } from '../../core/padding';
import { Position } from '../../core/position';
import { UIAbstractFactory } from '../../core/uiAbstractFactory';
import { PrettyButton } from './prettyButton';
import { PrettyNumberedList } from './prettyNumberedList';
import { PrettyText } from './prettyText';

export class PrettyUIAbstractFactory implements UIAbstractFactory {
  name: string = 'pretty';
  public createButton(
    position: Position,
    content: string,
    padding: Padding
  ): PrettyButton {
    return new PrettyButton(position, content, padding);
  }
  public createText(position: Position, content: string): PrettyText {
    return new PrettyText(position, content);
  }
  public createNumberedList(
    position: Position,
    content: string[]
  ): PrettyNumberedList {
    return new PrettyNumberedList(position, content);
  }
}
