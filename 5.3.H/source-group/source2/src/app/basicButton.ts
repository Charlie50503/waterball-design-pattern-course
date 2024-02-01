import { BasicButtonWrapper } from './basicWrapper';
import { Button } from './button';
import { Padding } from './padding';
import { Position } from './position';

export class BasicButton extends Button {
  constructor(position: Position, content: string, padding: Padding) {
    super(position, content, new BasicButtonWrapper(), padding);
  }
}
