import { CompositeExporter } from './exporter/compositeExporter';
import { ConsoleExporter } from './exporter/consoleExporter';
import { Exporter } from './exporter/exporter';
import { FileExporter } from './exporter/fileExporter';
import { LevelThreshold } from './levelThreshold';
import { Logger } from './logger';
import { StandardLayout } from './layout/standardLayout';
import { declareLoggers } from './loggerRepository';

import * as util from 'util';
import * as fs from 'fs';
interface ILoggerConfig {
  levelThreshold: string;
  exporter: {
    type: string;
    fileName?: string;
    children?: ILoggerConfig['exporter'][];
  };
  layout?: string;
  [key: string]: any; // 可以是任何類型，包括ILoggerConfig
}

export type FilePath = string;
const readFile = util.promisify(fs.readFile);

export class LoggerConfig {
  private loggers: { [name: string]: Logger } = {};

  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async parseJSONFile(): Promise<string> {
    return await readFile(this.filePath, 'utf-8');
  }

  public async initializeLoggers() {
    const fileString = await this.parseJSONFile();
    const configObj = JSON.parse(fileString) as {
      loggers: ILoggerConfig;
    };

    // 初始化根日誌器
    this.loggers['root'] = this.createLoggerFromConfig('root', {
      levelThreshold: configObj.loggers.levelThreshold,
      exporter: configObj.loggers.exporter,
      layout: configObj.loggers.layout,
    });

    // 初始化其他日誌器
    for (const [key, value] of Object.entries(configObj.loggers)) {
      if (key !== 'levelThreshold' && key !== 'exporter' && key !== 'layout') {
        this.genLogger(key, value, this.loggers['root']);
      }
    }

    declareLoggers(...Object.values(this.loggers));
  }

  private genLogger(name: string, config: ILoggerConfig, parent: Logger) {
    // 創建和設定當前的 logger
    if (config.levelThreshold || config.exporter || config.layout) {
      this.loggers[name] = this.createLoggerFromConfig(name, config, parent);
    }

    for (const [key, value] of Object.entries(config || {})) {
      if (key !== 'levelThreshold' && key !== 'exporter' && key !== 'layout') {
        this.genLogger(key, value, this.loggers[name]);
      }
    }
  }

  private createLoggerFromConfig(
    name: string,
    config: ILoggerConfig,
    parentLogger?: Logger
  ): Logger {
    const levelThreshold = this.getLevelThreshold(config.levelThreshold);
    const exporter = this.createExporterFromConfig(config.exporter);
    const parent = this.getValueOfNull(parentLogger!);
    const layout = this.getLayout(config?.layout!);

    return new Logger(levelThreshold, parent, name, exporter, layout);
  }

  private getValueOfNull<T>(value: T | null) {
    return value ? value : null;
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

  private getLayout(name: string | null) {
    switch (name) {
      case 'standard':
        return new StandardLayout();
      default:
        return null;
    }
  }

  private createExporterFromConfig(
    config: ILoggerConfig['exporter']
  ): Exporter | null {
    if (config == null || !config.hasOwnProperty('type')) {
      return null;
    } else if (config.type === 'console') {
      return new ConsoleExporter();
    } else if (config.type === 'file') {
      return new FileExporter(
        'd:\\project\\homework\\waterball-design-pattern-course-2\\4.4-H\\source',
        config.fileName!
      );
    } else if (config.type === 'composite') {
      const childExporters = config
        .children!.map(this.createExporterFromConfig.bind(this))
        .filter((e) => e !== null) as Exporter[];

      return new CompositeExporter(childExporters);
    }

    throw new Error(`Unknown exporter type: ${config.type}`);
  }
}
