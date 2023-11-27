import { Exporter } from './exporter';
import * as fs from 'fs';
export class FileExporter implements Exporter {
  filePath: string;
  fileName: string;

  constructor(filePath: string, fileName: string) {
    this.filePath = filePath;
    this.fileName = fileName;
  }

  export(log: string): void {
    this.appendToFile(log);
  }

  appendToFile(log: string) {
    fs.appendFile(`${this.filePath}/${this.fileName}`, log + '\n', 'utf8', (err) => {
      if (err) {
        console.error(`寫入檔案時發生錯誤: ${err}`);
      }
    });
  }
}
