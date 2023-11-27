import { Exporter } from './exporter/exporter';
import { Layout } from './layout/layout';
import { LevelThreshold } from './levelThreshold';

export class Logger {
  level: LevelThreshold;
  parent: Logger | null;
  name: string;
  exporter: Exporter;
  layout: Layout;

  constructor(
    level: LevelThreshold | null,
    parent: Logger | null,
    name: string,
    exporter: Exporter | null,
    layout: Layout | null
  ) {
    this.parent = parent;
    this.name = name;

    this.level = this.getValueOrExtendParent(level, 'level');
    this.exporter = this.getValueOrExtendParent(exporter, 'exporter');
    this.layout = this.getValueOrExtendParent(layout, 'layout');
  }

  private getValueOrExtendParent<T>(value: T | null, key: keyof Logger) {
    if (value) {
      return value;
    }
    if (this.parent) {
      return this.parent[key] as T;
    }
    throw Error(`${key} must be defined`);
  }

  private log(level: LevelThreshold, message: string) {
    if (level >= this.level) {
      const log = this.layout.formate(level, this.name, message);
      this.exporter.export(log);
    }

    if (this.parent) {
      this.parent.log(level, message);
    }
  }
  public trace(message: string) {
    this.log(LevelThreshold.TRACE, message);
  }

  public info(message: string) {
    this.log(LevelThreshold.INFO, message);
  }

  public debug(message: string) {
    this.log(LevelThreshold.DEBUG, message);
  }

  public warn(message: string) {
    this.log(LevelThreshold.WARN, message);
  }

  public error(message: string) {
    this.log(LevelThreshold.ERROR, message);
  }
}
