import { BasicButton } from './basicButton';
import { BasicNumberedList } from './basicNumberedList';
import { BasicText } from './basicText';
import { Padding } from '../../core/padding';
import { Position } from '../../core/position';
import { UIAbstractFactory } from '../../core/uiAbstractFactory';

export class BasicUIAbstractFactory implements UIAbstractFactory {
  name: string = 'basic';
  public createButton(
    position: Position,
    content: string,
    padding: Padding
  ): BasicButton {
    return new BasicButton(position, content, padding);
  }
  public createText(position: Position, content: string): BasicText {
    return new BasicText(position, content);
  }
  public createNumberedList(
    position: Position,
    content: string[]
  ): BasicNumberedList {
    return new BasicNumberedList(position, content);
  }
}
