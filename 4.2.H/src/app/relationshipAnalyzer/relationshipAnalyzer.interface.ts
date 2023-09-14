export type AdjacencyList = { [key: string]: string[] };

export interface IRelationshipAnalyzer {
  parse(script: string): void;
  getMutualFriends(name1: string, name2: string): string[];
  hasConnection(name1: string, name2: string): boolean;
}
