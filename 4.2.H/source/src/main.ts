import { RelationshipAnalyzerAdapter } from './app/relationshipAnalyzer/relationshipAnalyzerAdapter';
import * as util from 'util';
import * as fs from 'fs';
import { SuperRelationshipAnalyzer } from './app/superRelationshipAnalyzer/superRelationshipAnalyzer';
import { IRelationshipAnalyzer } from './app/relationshipAnalyzer/relationshipAnalyzer.interface';
import { IRelationshipGraph } from './app/relationshipGraph/relationshipGraph.interface';
export type FilePath = string;
const readFile = util.promisify(fs.readFile);

const FILE_PATH =
  'D:\\project\\homework\\waterball-design-pattern-course\\4.2.H\\source\\src\\data.txt';

async function main() {
  const fileString = await readFile(FILE_PATH, 'utf-8');
  const relationshipAnalyzer: IRelationshipAnalyzer =
    new RelationshipAnalyzerAdapter(new SuperRelationshipAnalyzer());
  const relationshipGraph: IRelationshipGraph =
    relationshipAnalyzer.parse(fileString);
  const mutualFriends = relationshipAnalyzer.getMutualFriends('A', 'B');
  console.log(mutualFriends);
  const hasConnection = relationshipGraph.hasConnection('F', 'B');
  console.log(hasConnection);
}

main();
