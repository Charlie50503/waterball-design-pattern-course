import { IRelationshipAnalyzer } from './relationshipAnalyzer.interface';
import { RelationshipAnalyzerAdapter } from './relationshipAnalyzerAdapter';

export class RelationshipAnalyzer implements IRelationshipAnalyzer {
  private relationshipAnalyzerAdapter: RelationshipAnalyzerAdapter;
  constructor(relationshipAnalyzerAdapter: RelationshipAnalyzerAdapter) {
    this.relationshipAnalyzerAdapter = relationshipAnalyzerAdapter;
  }

  public parse(script: string): void {
    this.relationshipAnalyzerAdapter.parse(script);
  }
  public getMutualFriends(name1: string, name2: string): string[] {
    return this.relationshipAnalyzerAdapter.getMutualFriends(name1, name2);
  }

  public hasConnection(name1:string,name2:string){
    return this.relationshipAnalyzerAdapter.hasConnection(name1,name2);
  }
}
