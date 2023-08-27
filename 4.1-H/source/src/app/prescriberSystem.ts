import { Prescriber } from './prescriber';
import { PrescriptionDemand } from './interfaces/prescriptionDemand';
import { PatientFileParser } from './fileParser/patientFileParser';
import { PotentialDiseaseFileParser } from './fileParser/potentialDiseaseFileParser';
import { PatientDatabase } from './database/patientDatabase';
import { Symptom } from './interfaces/symptom';
import { CaseRecordJSONFileExporter } from './exporter/caseRecordJSONFileExporter';
import { CaseRecordDatabase } from './database/caseRecordDatabase';
import { CaseRecordCSVFileExporter } from './exporter/caseRecordCSVFileExporter';
import { PotentialDisease } from './interfaces/potentialDisease';

export class PrescriberSystem {
  private _potentialDiseaseList: PotentialDisease[] = [];
  private _patientDatabase: PatientDatabase;
  private _caseRecordDatabase: CaseRecordDatabase;
  constructor(
    patientDatabase: PatientDatabase,
    caseRecordDatabase: CaseRecordDatabase,
  ) {
    this._patientDatabase = patientDatabase;
    this._caseRecordDatabase = caseRecordDatabase;
  }

  async initial(patientFilePath: string, potentialDiseaseFilePath: string) {
    const patientFileParser = new PatientFileParser();
    const patients = await patientFileParser.parse(patientFilePath);
    const potentialDiseaseFileParser = new PotentialDiseaseFileParser();
    const potentialDiseaseList = await potentialDiseaseFileParser.parse(
      potentialDiseaseFilePath
    );

    if (patients) {
      this._patientDatabase.setPatients(patients);
    } else {
      throw Error('沒有輸入任何的病患基本資料');
    }
    if (potentialDiseaseList) {
      this._potentialDiseaseList = potentialDiseaseList;
    } else {
      throw Error('沒有輸入任何的可選處方規則');
    }
  }

  async run(prescriber:Prescriber,prescriptionDemandList: PrescriptionDemand[]) {
    prescriptionDemandList.forEach((demand) => {
      prescriber.addDemand(demand);
    });
    do {
      await prescriber.diagnose();
    } while (prescriber.getQueueSize() > 0);
  }

  export(exportFileType: 'JSON' | 'CSV', exportFolderPath: string) {
    if (exportFileType === 'JSON') {
      const caseRecordJSONFileExporter = new CaseRecordJSONFileExporter();
      caseRecordJSONFileExporter.export(
        this._caseRecordDatabase.selectAll(),
        exportFolderPath
      );
    } else if (exportFileType === 'CSV') {
      const caseRecordCSVFileExporter = new CaseRecordCSVFileExporter();
      caseRecordCSVFileExporter.export(
        this._caseRecordDatabase.selectAll(),
        exportFolderPath
      );
    }
  }

  getPotentialDiseaseList(){
    return this._potentialDiseaseList
  }
}
