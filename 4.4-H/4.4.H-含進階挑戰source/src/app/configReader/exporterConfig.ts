export interface ExporterConfig {
  type: string;
  fileName?: string;
  children?: ExporterConfig[];
}
