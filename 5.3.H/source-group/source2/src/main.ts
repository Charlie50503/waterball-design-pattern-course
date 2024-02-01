import { BasicButton } from './app/basicButton';
import { BasicNumberedList } from './app/basicNumberedList';
import { BasicText } from './app/basicText';
import { BasicButtonWrapper } from './app/basicWrapper';
import { Button } from './app/button';
import { NumberedList } from './app/numberedList';
import { Padding } from './app/padding';
import { Position } from './app/position';
import { MyText } from './app/text';
import { UI } from './app/ui';

function main() {
  const buttons: Button[] = [
    new BasicButton(new Position(1, 1), 'Top Button', new Padding(1, 1, 1, 1)),
    // new BasicButton(new Position(3, 1), 'yse', new Padding(1, 1, 1, 1)),
    // new BasicButton(new Position(3, 1), 'no', new Padding(1, 1, 1, 1)),
  ];
  const textList: MyText[] = [
    // new BasicText(new Position(1, 2), '123'),
    // new BasicText(new Position(1, 2), '1234'),
  ];
  const numberedLists: NumberedList[] = [
    // new BasicNumberedList(new Position(1, 3), ['test', 'test', 'test']),
  ];
  const ui = new UI(30, 30, buttons, textList, numberedLists);
  ui.draw();
}

main()
