import { Exporter } from "./exporter";

export class ConsoleExporter implements Exporter {
  export(log: string): void {
    console.log(log);
  }
}