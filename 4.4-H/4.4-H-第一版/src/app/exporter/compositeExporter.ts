import { Exporter } from './exporter';

export class CompositeExporter implements Exporter {
  exporters: Exporter[] = [];
  constructor(childExporters: Exporter[]) {
    this.exporters = childExporters;
  }
  export(log: string): void {
    this.exporters.forEach((exporter) => {
      exporter.export(log);
    })
  }
}
