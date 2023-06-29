import { CardPatternFormatterHandler } from '../card-pattern-formatter-handler/card-pattern-formatter-handler';
import { AIPlay } from '../play/ai-play';
import { Play } from '../play/play';
import { Player } from './player';

export class AIPlayer extends Player {
  public playAction: Play;

  constructor(
    id: number,
    cardPatternFormatterHandler: CardPatternFormatterHandler
  ) {
    super(id);
    this.playAction = new AIPlay(cardPatternFormatterHandler);
  }
}
