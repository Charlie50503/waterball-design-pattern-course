import { Padding } from './app/core/padding';
import { Position } from './app/core/position';
import { UI } from './app/core/ui';
import { IButton } from './app/interfaces/button.interface';
import { INumberedList } from './app/interfaces/numberedList.interface';
import { IText } from './app/interfaces/text.interface';
import { BasicUIAbstractFactory } from './app/styles/basic/basicUIAbstractFactory';
import { PrettyUIAbstractFactory } from './app/styles/pretty/prettyUIAbstractFactory';

function main() {
  var buttons: IButton[] = [
    {
      position: new Position(3, 1),
      content: 'Hi, I miss u',
      padding: new Padding(0, 1, 0, 1),
    },
    {
      position: new Position(3, 6),
      content: 'No',
      padding: new Padding(0, 1, 0, 1),
    },
    {
      position: new Position(12, 6),
      content: 'Yes',
      padding: new Padding(0, 1, 0, 1),
    },
  ];

  var textList: IText[] = [
    {
      position: new Position(4, 4),
      content: 'Do u love me ?',
    },
    {
      position: new Position(4, 5),
      content: 'Please tell...',
    },
  ];

  var numberedLists: INumberedList[] = [
    {
      position: new Position(3, 9),
      content: ["Let's Travel", 'Back to home', 'Have dinner'],
    },
  ];
  var ui = new UI(22, 13, buttons, textList, numberedLists);
  ui.registerFactory(new BasicUIAbstractFactory())
    .registerFactory(new PrettyUIAbstractFactory())
    .setAsciiTheme('pretty');
  ui.draw();
}

main();
