import { CaseRecord } from '../interfaces/caseRecord';
import { Exporter } from './exporter';

export class CaseRecordCSVFileExporter extends Exporter<CaseRecord[]> {
  protected generateFilePath(exportFolderPath: string) {
    const fileName = `CaseRecords_${this.generateYYYYMMDDDate()}.csv`;
    const filePath = `${exportFolderPath}/${fileName}`;
    return filePath;
  }

  protected formatterData(data: CaseRecord[]): string {
    // 定義 CSV 的表頭
    const header = [
      'CaseTime',
      'SymptomDescription',
      'PrescriptionName',
      'PrescriptionUsage',
      'PrescriptionPotentialDisease',
      'PrescriptionMedicines',
      'PrescriptionPotentialDiseaseName',  // 新增
      'PrescriptionMedicinesName', // 新增
      'PrescriptionMedicinesDosage' // 新增
    ];
    let csvData = header.join(',') + '\n';

    // 將每一條 CaseRecord 轉換成 CSV 格式
    for (const record of data) {
      const caseTime = record.getCaseTime().toISOString();
      const symptomDescription = record
        .getSymptoms()
        .map((s) => s.getDescription())
        .join(';');
      const prescription = record.getPrescription();
      const prescriptionName = prescription.getName();
      const prescriptionUsage = prescription.getUsage();
      const prescriptionPotentialDisease = prescription.getPotentialDisease();
      const prescriptionPotentialDiseaseName = prescriptionPotentialDisease.getName(); // 假設有一個 getName 方法
      prescriptionPotentialDisease
      const prescriptionMedicines = prescription.getMedicines() ?? [];
      const prescriptionMedicinesName = prescriptionMedicines.map(m => m.getName()).join(';'); // 假設 Medicine 有一個 getName 方法

      const row = [
        caseTime,
        symptomDescription,
        prescriptionName,
        prescriptionUsage,
        prescriptionPotentialDiseaseName,
        prescriptionMedicinesName,
      ];
      csvData += row.join(',') + '\n';
    }

    return csvData;
  }
}
