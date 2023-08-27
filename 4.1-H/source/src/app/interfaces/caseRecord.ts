import { Prescription } from './prescription';
import { Symptom } from './symptom';

export class CaseRecord {
  private _symptoms!: Symptom[];
  private _prescription!: Prescription;
  private _caseTime!: Date;

  constructor(symptoms: Symptom[], prescription: Prescription) {
    this.setSymptoms(symptoms);
    this.setPrescription(prescription);
    this.setCaseTime(new Date());
  }

  setSymptoms(symptoms: Symptom[]) {
    this._symptoms = symptoms;
  }

  setPrescription(prescription: Prescription) {
    this._prescription = prescription;
  }

  setCaseTime(caseTime: Date) {
    this._caseTime = caseTime;
  }

  getSymptoms() {
    return this._symptoms;
  }

  getPrescription() {
    return this._prescription;
  }

  getCaseTime() {
    return this._caseTime;
  }
}
