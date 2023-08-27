import { Medicine } from '../app/interfaces/medicine';
import { Patient } from '../app/interfaces/patient';
import { PotentialDisease } from '../app/interfaces/potentialDisease';
import { Prescription } from '../app/interfaces/prescription';
import { Symptom } from '../app/interfaces/symptom';
import { FindPrescriptionHandler } from './findPrescriptionHandler';

export class SleepApneaSyndromeHandler extends FindPrescriptionHandler {
  ownSymptoms: Symptom[] = [new Symptom('snore')];
  constructor(next: FindPrescriptionHandler | null) {
    super(next);
  }

  protected doHandling(): Prescription {
    return new Prescription(
      [new Medicine('一捲膠帶')],
      new PotentialDisease('睡眠呼吸中止症（專業學名：SleepApneaSyndrome）'),
      '打呼抑制劑',
      '睡覺時，撕下兩塊膠帶，將兩塊膠帶交錯黏在關閉的嘴巴上，就不會打呼了。'
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
    // 體重(公斤) / 身高2(公尺2)
    const heightByMeter = patient.getHeight() / 100
    const bmi =  patient.getWeight() / (heightByMeter * heightByMeter);

    return isPotentialDiseaseEnable && hasSymptom && bmi > 26
      ? true
      : false;
  }

  public getPotentialDiseaseName(): PotentialDisease {
    return new PotentialDisease('SleepApneaSyndrome');
  }
}
