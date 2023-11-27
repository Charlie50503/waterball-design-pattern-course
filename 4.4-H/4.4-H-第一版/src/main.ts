import { CompositeExporter } from './app/exporter/compositeExporter';
import { ConsoleExporter } from './app/exporter/consoleExporter';
import { FileExporter } from './app/exporter/fileExporter';
import { StandardLayout } from './app/layout/standardLayout';
import { LevelThreshold } from './app/levelThreshold';
import { Logger } from './app/logger';
import { declareLoggers } from './app/loggerRepository';
import { Game } from './client/game';

function entry() {
  const root = new Logger(
    LevelThreshold.DEBUG,
    null,
    'root',
    new ConsoleExporter(),
    new StandardLayout()
  );

  const gameLogger = new Logger(
    LevelThreshold.INFO,
    root,
    'app.game',
    new CompositeExporter([
      new ConsoleExporter(),
      new FileExporter(
        'd:\\project\\homework\\waterball-design-pattern-course-2\\4.4-H\\source',
        'game.log'
      ),
      new FileExporter(
        'd:\\project\\homework\\waterball-design-pattern-course-2\\4.4-H\\source',
        'game.backup.log'
      ),
    ]),
    new StandardLayout()
  );

  // 定義 app.game.ai 日誌器，繼承 app.game 日誌器並覆寫分級門檻
  const aiLogger = new Logger(
    LevelThreshold.TRACE,
    gameLogger,
    'app.game.ai',
    null,
    new StandardLayout()
  );

  declareLoggers(root, gameLogger, aiLogger);

  const game = new Game();
  game.start();
}

entry();
