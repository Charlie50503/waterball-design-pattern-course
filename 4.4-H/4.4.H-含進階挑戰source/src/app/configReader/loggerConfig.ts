import { ExporterConfig } from './exporterConfig';

export interface LoggerConfig {
  levelThreshold: string;
  exporter?: ExporterConfig | undefined;
  layout?: string | undefined;
}
