import { CaseRecordDatabase } from './app/database/caseRecordDatabase';
import { PatientDatabase } from './app/database/patientDatabase';
import { PrescriptionDemand } from './app/interfaces/prescriptionDemand';
import { Prescriber } from './app/prescriber';
import { PrescriberSystem } from './app/prescriberSystem';
import { AttractiveHandler } from './FindPrescriptionHandler/attractiveHandler';
import { COVID19Handler } from './FindPrescriptionHandler/COVID19Handler';
import { FindPrescriptionHandler } from './FindPrescriptionHandler/findPrescriptionHandler';
import { SleepApneaSyndromeHandler } from './FindPrescriptionHandler/sleepApneaSyndromeHandler';

export class PrescriberFacade {
  private _patientDatabase = new PatientDatabase();
  private _caseRecordDatabase = new CaseRecordDatabase();
  private prescriberSystem = new PrescriberSystem(
    this._patientDatabase,
    this._caseRecordDatabase
  );

  private prescriber!: Prescriber;

  async initial(patientFilePath: string, potentialDiseaseFilePath: string) {
    await this.prescriberSystem.initial(patientFilePath, potentialDiseaseFilePath);

    this.prescriber = new Prescriber(
      this._patientDatabase,
      this._caseRecordDatabase,
      this.prescriberSystem.getPotentialDiseaseList(),
      new COVID19Handler(
        new AttractiveHandler(new SleepApneaSyndromeHandler(null))
      )
    );
  }

  async run(prescriptionDemandList: PrescriptionDemand[]) {
    await this.prescriberSystem.run(this.prescriber, prescriptionDemandList);
  }

  export(exportFileType: 'JSON' | 'CSV', exportFolderPath: string) {
    this.prescriberSystem.export(exportFileType, exportFolderPath);
  }
}
