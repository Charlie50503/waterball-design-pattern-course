import { Patient } from '../app/interfaces/patient';
import { PotentialDisease } from '../app/interfaces/potentialDisease';
import { Prescription } from '../app/interfaces/prescription';
import { Symptom } from '../app/interfaces/symptom';

export abstract class FindPrescriptionHandler {
  private next: FindPrescriptionHandler | null;

  constructor(next: FindPrescriptionHandler | null) {
    this.next = next;
  }

  public handle(
    patient: Patient,
    potentialDiseaseList: PotentialDisease[],
    symptoms: Symptom[]
  ): Prescription | undefined {
    if (this.isMatch(patient, potentialDiseaseList, symptoms)) {
      return this.doHandling();
    } else if (this.next) {
      return this.next.handle(patient, potentialDiseaseList, symptoms);
    }
  }

  protected abstract doHandling(): Prescription;

  protected abstract isMatch(
    patient: Patient,
    potentialDiseaseList: PotentialDisease[],
    symptoms: Symptom[]
  ): boolean;

  public abstract getPotentialDiseaseName(): PotentialDisease;
}
