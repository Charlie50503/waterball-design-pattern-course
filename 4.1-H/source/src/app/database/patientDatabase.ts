import { Patient } from "../interfaces/patient";

export class PatientDatabase {
  private _patients: Patient[];

  constructor() {
    this._patients = [];
  }

  insert(patient: Patient): void {
    this._patients.push(patient);
  }

  findOne(id: string): Patient | undefined {
    return this._patients.find(patient => patient.getIdCard().getId() === id);
  }

  getPatients(): Patient[] {
    return this._patients;
  }

  setPatients(patients: Patient[]): void {
    this._patients = patients;
  }
}
