import { ExporterConfig } from './exporterConfig';
import { LoggerConfig } from './loggerConfig';

export interface ParentLoggerConfig extends LoggerConfig {
  exporter: ExporterConfig;
  layout: string;
}
