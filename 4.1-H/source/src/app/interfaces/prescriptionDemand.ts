import { IdentityCard } from './IdentityCard';
import { Symptom } from './symptom';

export class PrescriptionDemand {
  private _patientID!: IdentityCard;
  private _symptoms!: Symptom[];

  constructor(patientID: IdentityCard, symptoms: Symptom[]) {
    this.setPatientID(patientID);
    this.setSymptoms(symptoms);
  }

  setPatientID(patientID: IdentityCard) {
    this._patientID = patientID;
  }

  setSymptoms(symptoms: Symptom[]) {
    this._symptoms = symptoms;
  }

  getPatientID() {
    return this._patientID;
  }

  getSymptoms() {
    return this._symptoms;
  }
}
