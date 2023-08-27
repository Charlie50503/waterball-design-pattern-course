import { Gender } from '../app/enum/gender.enum';
import { Medicine } from '../app/interfaces/medicine';
import { Patient } from '../app/interfaces/patient';
import { PotentialDisease } from '../app/interfaces/potentialDisease';
import { Prescription } from '../app/interfaces/prescription';
import { Symptom } from '../app/interfaces/symptom';
import { FindPrescriptionHandler } from './findPrescriptionHandler';

export class AttractiveHandler extends FindPrescriptionHandler {
  ownSymptoms: Symptom[] = [new Symptom('sneeze')];
  constructor(next: FindPrescriptionHandler | null) {
    super(next);
  }

  protected doHandling(): Prescription {
    return new Prescription(
      [new Medicine('假鬢角'), new Medicine('臭味')],
      new PotentialDisease('有人想你了 (專業學名：Attractive)'),
      '青春抑制劑',
      '把假鬢角黏在臉的兩側，讓自己異性緣差一點，自然就不會有人想妳了。'
    );
  }

  protected isMatch(
    patient: Patient,
    potentialDiseaseList: PotentialDisease[],
    symptoms: Symptom[]
  ): boolean {
    const isPotentialDiseaseEnable = potentialDiseaseList.find(
      (potentialDisease) =>
        this.getPotentialDiseaseName().getName() === potentialDisease.getName()
    );

    const hasSymptom = this.ownSymptoms.every((ownSymptom) => {
      return symptoms.find((symptom) => symptom.isSame(ownSymptom)) ? true : false
    })
    const is18YearOldFemale =
      patient.getGender() === Gender.female && patient.getAge() === 18;

    return isPotentialDiseaseEnable && hasSymptom && is18YearOldFemale
      ? true
      : false;
  }

  public getPotentialDiseaseName(): PotentialDisease {
    return new PotentialDisease('Attractive');
  }
}
