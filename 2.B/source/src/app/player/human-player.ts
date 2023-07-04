import { CardPatternHandler } from '../card-pattern-handler/card-pattern-handler';
import { HumanPlay } from '../play/human-play';
import { Player } from './player';

export class HumanPlayer extends Player {
  constructor(id: number, cardPatternHandler: CardPatternHandler) {
    super(id, new HumanPlay(cardPatternHandler));
  }
}
