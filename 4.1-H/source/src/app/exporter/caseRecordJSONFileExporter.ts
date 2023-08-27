import { CaseRecord } from '../interfaces/caseRecord';
import { Exporter } from './exporter';
export class CaseRecordJSONFileExporter extends Exporter<CaseRecord[]> {
  protected generateFilePath(exportFolderPath: string) {
    const fileName = `CaseRecords_${this.generateYYYYMMDDDate()}.json`;
    const filePath = `${exportFolderPath}/${fileName}`;
    return filePath;
  }

  protected formatterData(data: CaseRecord[]) {
    const jsonData = JSON.stringify(data);
    return jsonData;
  }
}
