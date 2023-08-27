import { FindPrescriptionHandler } from '../FindPrescriptionHandler/findPrescriptionHandler';
import { CaseRecordDatabase } from './database/caseRecordDatabase';
import { PatientDatabase } from './database/patientDatabase';
import { CaseRecord } from './interfaces/caseRecord';
import { PotentialDisease } from './interfaces/potentialDisease';
import { PrescriptionDemand } from './interfaces/prescriptionDemand';

export class Prescriber {
  private static readonly WAITING_TIME: number = 3000;
  private _queue: PrescriptionDemand[] = [];
  private _findPrescriptionHandler: FindPrescriptionHandler;
  private _patientDatabase: PatientDatabase;
  private _caseRecordDatabase: CaseRecordDatabase;
  potentialDiseaseList: PotentialDisease[] = [];
  constructor(
    patientDatabase: PatientDatabase,
    caseRecordDatabase: CaseRecordDatabase,
    potentialDiseaseList: PotentialDisease[],
    findPrescriptionHandler: FindPrescriptionHandler
  ) {
    this._patientDatabase = patientDatabase;
    this._caseRecordDatabase = caseRecordDatabase;
    this.potentialDiseaseList = potentialDiseaseList;
    this._findPrescriptionHandler = findPrescriptionHandler;
  }

  public async diagnose(): Promise<void> {
    if (this._queue.length === 0) {
      console.log('等待新的診斷要求...');
      return;
    }

    const currentDemand = this._queue.shift();
    if (!currentDemand) {
      throw Error('沒找到診斷要求');
    }
    const patient = this._patientDatabase.findOne(
      currentDemand?.getPatientID().getId()
    );
    if (!patient) {
      throw Error('沒找到病患基本資料');
    }
    console.log(`正在診斷病患：${patient.getName()}`);

    const prescription = this._findPrescriptionHandler.handle(
      patient,
      this.potentialDiseaseList,
      currentDemand.getSymptoms()
    );
    // 假設診斷需要 3 秒的時間
    await new Promise((resolve) =>
      setTimeout(resolve, Prescriber.WAITING_TIME)
    );

    if (!prescription) {
      console.log('沒找到對應疾病治療方式');
      // throw Error();
    } else {
      const caseRecord = new CaseRecord(
        currentDemand.getSymptoms(),
        prescription
      );
      this._caseRecordDatabase.insert(caseRecord);
    }
  }
  public addDemand(demand: PrescriptionDemand): void {
    this._queue.push(demand);
  }

  public getQueueSize() {
    return this._queue.length;
  }
}
