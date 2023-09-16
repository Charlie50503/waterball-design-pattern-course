export interface IRelationshipGraph {
  hasConnection(name1: string, name2: string): boolean;
}