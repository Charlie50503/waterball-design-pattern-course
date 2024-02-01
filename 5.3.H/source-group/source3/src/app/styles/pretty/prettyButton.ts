import { Button } from '../../core/button';
import { Padding } from '../../core/padding';
import { Position } from '../../core/position';
import { ButtonWrapper } from '../../interfaces/wrapper.interface';

export class PrettyButton extends Button {
  constructor(position: Position, content: string, padding: Padding) {
    super(position, content, padding);
  }

  protected getWrapper(): ButtonWrapper {
    return {
      topLeft: '┌',
      topRight: '┐',
      bottomLeft: '└',
      bottomRight: '┘',
      horizontalLine: '─',
      verticalLine: '│',
    };
  }
}
