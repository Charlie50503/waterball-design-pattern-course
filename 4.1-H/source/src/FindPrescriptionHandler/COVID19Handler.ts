import { Medicine } from '../app/interfaces/medicine';
import { Patient } from '../app/interfaces/patient';
import { PotentialDisease } from '../app/interfaces/potentialDisease';
import { Prescription } from '../app/interfaces/prescription';
import { Symptom } from '../app/interfaces/symptom';
import { FindPrescriptionHandler } from './findPrescriptionHandler';

export class COVID19Handler extends FindPrescriptionHandler {
  ownSymptoms: Symptom[] = [
    new Symptom('sneeze'),
    new Symptom('Headache'),
    new Symptom('Cough'),
  ];
  constructor(next: FindPrescriptionHandler | null) {
    super(next);
  }

  protected doHandling(): Prescription {
    return new Prescription(
      [new Medicine('清冠一號')],
      new PotentialDisease('新冠肺炎（專業學名：COVID-19）'),
      '清冠一號',
      '將相關藥材裝入茶包裡，使用500 mL 溫、熱水沖泡悶煮1~3 分鐘後即可飲用。'
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

    return isPotentialDiseaseEnable && hasSymptom ? true : false;
  }

  public getPotentialDiseaseName(): PotentialDisease {
    return new PotentialDisease('COVID-19');
  }
}
