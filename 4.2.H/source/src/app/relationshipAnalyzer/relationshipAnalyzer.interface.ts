import { IRelationshipGraph } from "../relationshipGraph/relationshipGraph.interface";

export type AdjacencyList = { [key: string]: string[] };

export interface IRelationshipAnalyzer {
  parse(script: string): IRelationshipGraph;
  getMutualFriends(name1: string, name2: string): string[];
}
