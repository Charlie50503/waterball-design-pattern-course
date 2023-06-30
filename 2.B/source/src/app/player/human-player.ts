import { CardPatternHandler } from '../card-pattern-handler/card-pattern-handler';
import { HumanPlay } from '../play/human-play';
import { Play } from '../play/play';
import { Player } from './player';

export class HumanPlayer extends Player {
  public playAction:Play;

  constructor(id: number,cardPatternHandler: CardPatternHandler) {
    super(id);
    this.playAction = new HumanPlay(cardPatternHandler);
  }

}
