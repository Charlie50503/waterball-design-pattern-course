import { Exporter } from '../exporter/exporter';
import { Logger } from '../logger';
import * as util from 'util';
import * as fs from 'fs';
import { ExporterConfig } from './exporterConfig';
import { Layout } from '../layout/layout';
import { LevelThreshold } from '../levelThreshold';
import { ParentLoggerConfig } from './parentLoggerConfig';
import { StandardLayout } from '../layout/standardLayout';
import { CompositeExporter } from '../exporter/compositeExporter';
import { ConsoleExporter } from '../exporter/consoleExporter';
import { FileExporter } from '../exporter/fileExporter';
import { LoggerConfig } from './loggerConfig';
import { declareLoggers } from '../loggerRepository';
export type FilePath = string;
const readFile = util.promisify(fs.readFile);
export class LoggerConfigReader {
  configFilePath: string;
  loggers: { [name: string]: Logger } = {};

  constructor(configFilePath: string) {
    this.configFilePath = configFilePath;
  }

  public async initializeLoggers() {
    const fileString = await this.parseJSONFile();
    const { loggers } = JSON.parse(fileString) as {
      loggers: ParentLoggerConfig;
    };

    const rootLogger = new Logger(
      this.getLevelThreshold(loggers.levelThreshold),
      null,
      'root',
      this.createExporter(loggers.exporter),
      this.createLayout(loggers.layout)
    );

    this.loggers['root'] = rootLogger;

    // 初始化其他日誌器
    for (const [key, value] of Object.entries(loggers)) {
      if (key !== 'levelThreshold' && key !== 'exporter' && key !== 'layout') {
        this.genLogger(key, value, rootLogger);
      }
    }

    declareLoggers(...Object.values(this.loggers));
  }

  private async parseJSONFile(): Promise<string> {
    return await readFile(this.configFilePath, 'utf-8');
  }

  private genLogger(
    loggerName: string,
    config: LoggerConfig,
    parentLogger: Logger
  ) {
    // 建立當前層級的 logger
    const currentLogger = new Logger(
      this.getLevelThreshold(config.levelThreshold),
      parentLogger,
      loggerName,
      this.createExporter(config?.exporter),
      this.createLayout(config?.layout)
    );

    this.loggers[loggerName] = currentLogger;

    for (const [key, value] of Object.entries(config || {})) {
      if (key !== 'levelThreshold' && key !== 'exporter' && key !== 'layout') {
        this.genLogger(key, value, this.loggers[loggerName]);
      }
    }
  }

  private createExporter(
    exporterConfig: ExporterConfig | undefined
  ): Exporter | null {
    if (
      exporterConfig == undefined ||
      exporterConfig == null ||
      !exporterConfig.hasOwnProperty('type')
    ) {
      return null;
    } else if (exporterConfig.type === 'console') {
      return new ConsoleExporter();
    } else if (exporterConfig.type === 'file') {
      return new FileExporter(
        'd:\\project\\homework\\waterball-design-pattern-course-2\\4.4-H\\source',
        exporterConfig.fileName!
      );
    } else if (exporterConfig.type === 'composite') {
      const childExporters = exporterConfig
        .children!.map(this.createExporter.bind(this))
        .filter((e) => e !== null) as Exporter[];

      return new CompositeExporter(childExporters);
    }

    throw new Error(`Unknown exporter type: ${exporterConfig.type}`);
  }

  private createLayout(name: string | undefined): Layout | null {
    switch (name) {
      case 'standard':
        return new StandardLayout();
      default:
        return null;
    }
  }

  private getLevelThreshold(levelName: string) {
    switch (levelName) {
      case 'TRACE':
        return LevelThreshold.TRACE;
      case 'INFO':
        return LevelThreshold.INFO;
      case 'DEBUG':
        return LevelThreshold.DEBUG;
      case 'WARN':
        return LevelThreshold.WARN;
      case 'ERROR':
        return LevelThreshold.ERROR;
      default:
        return null;
    }
  }
}
