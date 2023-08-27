import { Patient } from '../interfaces/patient';
import { FileParser } from './fileParser.interface';
import * as fs from 'fs';
import * as util from 'util';
import { Gender } from '../enum/gender.enum';
import { IdentityCard } from '../interfaces/IdentityCard';
export type FilePath = string;
const readFile = util.promisify(fs.readFile);
export class PatientFileParser implements FileParser<Patient[] | undefined> {
  public async parse(filePath: string): Promise<Patient[] | undefined> {
    try {
      const fileString = await readFile(filePath, 'utf-8');
      const patientInputDataList = JSON.parse(fileString) as InputData[];
      const patientDataList: Patient[] = patientInputDataList.map((data) => {
        return new Patient(
          new IdentityCard(data.idCard.id),
          data.name,
          data.gender,
          data.age,
          data.height,
          data.weight
        );
      });
      return patientDataList;
    } catch (error) {
      console.log(error);
    }
  }

  transform() {}
}

export interface InputData {
  idCard: {
    id: string;
  };
  name: string;
  gender: Gender;
  age: number;
  height: number;
  weight: number;
}
