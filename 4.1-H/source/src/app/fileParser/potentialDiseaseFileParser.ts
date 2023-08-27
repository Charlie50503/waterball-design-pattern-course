import { FileParser } from './fileParser.interface';
import * as fs from 'fs';
import * as util from 'util';
import { PotentialDisease } from '../interfaces/potentialDisease';
export type FilePath = string;
const readFile = util.promisify(fs.readFile);
const os = require('os');
export class PotentialDiseaseFileParser implements FileParser<PotentialDisease[] | undefined> {
  public async parse(filePath: string): Promise<PotentialDisease[] | undefined> {
    try {
      const fileString = await readFile(filePath, 'utf-8');
      const potentialDisease = fileString
        .split(os.EOL)
        .reduce((potentialDiseaseList: PotentialDisease[], cur) => {
          const potentialDiseaseName = cur.trim();
          potentialDiseaseList.push(new PotentialDisease(potentialDiseaseName));
          return potentialDiseaseList;
        }, []);
      return potentialDisease;
    } catch (error) {
      console.log(error);
    }
  }
}
