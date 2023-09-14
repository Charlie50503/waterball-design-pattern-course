import { RelationshipAnalyzerAdapter } from './app/relationshipAnalyzer/relationshipAnalyzerAdapter';
import * as util from 'util';
import * as fs from 'fs';
import { RelationshipAnalyzer } from './app/relationshipAnalyzer/relationshipAnalyzer';
export type FilePath = string;
const readFile = util.promisify(fs.readFile);

const FILE_PATH =
  'D:\\project\\homework\\waterball-design-pattern-course\\4.2.H\\source\\src\\data.txt';

async function main() {
  const relationshipAnalyzerCLI = new RelationshipAnalyzer(
    new RelationshipAnalyzerAdapter()
  );
  const fileString = await readFile(FILE_PATH, 'utf-8');
  relationshipAnalyzerCLI.parse(fileString);
  const mutualFriends = relationshipAnalyzerCLI.getMutualFriends('A', 'B');
  console.log(mutualFriends);
  const hasConnection = relationshipAnalyzerCLI.hasConnection('F', 'B');
  console.log(hasConnection);
}

main();
