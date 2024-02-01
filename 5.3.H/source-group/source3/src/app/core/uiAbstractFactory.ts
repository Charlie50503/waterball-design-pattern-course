import { Button } from './button';
import { NumberedList } from './numberedList';
import { Padding } from './padding';
import { Position } from './position';
import { MyText } from './text';

export interface UIAbstractFactory {
  name: string;
  createButton(position: Position, content: string, padding: Padding): Button;
  createText(position: Position, content: string): MyText;
  createNumberedList(position: Position, content: string[]): NumberedList;
}
