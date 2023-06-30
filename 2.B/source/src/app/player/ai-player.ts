import { CardPatternHandler } from '../card-pattern-handler/card-pattern-handler';
import { AIPlay } from '../play/ai-play';
import { Play } from '../play/play';
import { Player } from './player';

export class AIPlayer extends Player {
  public playAction: Play;

  constructor(
    id: number,
    cardPatternHandler: CardPatternHandler
  ) {
    super(id);
    this.playAction = new AIPlay(cardPatternHandler);
  }
}
