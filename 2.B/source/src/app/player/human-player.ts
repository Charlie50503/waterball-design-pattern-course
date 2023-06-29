import { CardPatternFormatterHandler } from '../card-pattern-formatter-handler/card-pattern-formatter-handler';
import { HumanPlay } from '../play/human-play';
import { Play } from '../play/play';
import { Player } from './player';

export class HumanPlayer extends Player {
  public playAction:Play;

  constructor(id: number,cardPatternFormatterHandler: CardPatternFormatterHandler) {
    super(id);
    this.playAction = new HumanPlay(cardPatternFormatterHandler);
  }

}
