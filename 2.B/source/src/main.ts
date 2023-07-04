import { HumanPlayer } from './app/player/human-player';
import { AIPlay } from './app/play/ai-play';
import { Big2 } from './app/big2';
import { AIPlayer } from './app/player/ai-player';
import { StraightFlushHandler } from './app/card-pattern-handler/straight-flush-handler';
import { CardPatternHandlerService } from './app/card-pattern-handler/card-pattern-handler.service';
import { StraightHandler } from './app/card-pattern-handler/straight-handler';
import { FullHouseHandler } from './app/card-pattern-handler/full-house-handler';
import { PairHandler } from './app/card-pattern-handler/pair-handler';
import { SingleHandler } from './app/card-pattern-handler/signle-handler';

async function main() {
  const big2 = new Big2([
    new HumanPlayer(
      0,
      new StraightFlushHandler(
        new StraightHandler(
          new FullHouseHandler(
            new PairHandler(
              new SingleHandler(null),
              new CardPatternHandlerService()
            ),
            new CardPatternHandlerService()
          ),
          new CardPatternHandlerService()
        ),
        new CardPatternHandlerService()
      )
    ),
    new HumanPlayer(
      1,
      new StraightFlushHandler(
        new StraightHandler(
          new FullHouseHandler(
            new PairHandler(
              new SingleHandler(null),
              new CardPatternHandlerService()
            ),
            new CardPatternHandlerService()
          ),
          new CardPatternHandlerService()
        ),
        new CardPatternHandlerService()
      )
    ),
    new HumanPlayer(
      2,
      new StraightFlushHandler(
        new StraightHandler(
          new FullHouseHandler(
            new PairHandler(
              new SingleHandler(null),
              new CardPatternHandlerService()
            ),
            new CardPatternHandlerService()
          ),
          new CardPatternHandlerService()
        ),
        new CardPatternHandlerService()
      )
    ),
    new HumanPlayer(
      3,
      new StraightFlushHandler(
        new StraightHandler(
          new FullHouseHandler(
            new PairHandler(
              new SingleHandler(null),
              new CardPatternHandlerService()
            ),
            new CardPatternHandlerService()
          ),
          new CardPatternHandlerService()
        ),
        new CardPatternHandlerService()
      )
    ),
  ]);
  await big2.start();
}

main();
