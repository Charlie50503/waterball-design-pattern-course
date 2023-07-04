import { CardPatternHandler } from '../card-pattern-handler/card-pattern-handler';
import { AIPlay } from '../play/ai-play';
import { Player } from './player';

export class AIPlayer extends Player {
  constructor(
    id: number,
    cardPatternHandler: CardPatternHandler
  ) {
    super(id, new AIPlay(cardPatternHandler));
  }
}
