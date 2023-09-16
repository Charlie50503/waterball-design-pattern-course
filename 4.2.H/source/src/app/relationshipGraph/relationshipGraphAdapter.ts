import { Graph } from '@dagrejs/graphlib';
import { IRelationshipGraph } from './relationshipGraph.interface';
import { AdjacencyList } from '../relationshipAnalyzer/relationshipAnalyzer.interface';

export class RelationshipGraphAdapter implements IRelationshipGraph {
  private graph = new Graph({
    directed: false,
    compound: true,
    multigraph: true,
  });

  constructor(adjacencyList: AdjacencyList) {
    this.graphInit(adjacencyList);
  }

  public hasConnection(name1: string, name2: string): boolean {
    return this.graph.hasEdge(name1, name2);
  }

  private graphInit(adjacencyList: AdjacencyList) {
    for (const [node, neighbors] of Object.entries(adjacencyList)) {
      if (!this.graph.hasNode(node)) {
        this.graph.setNode(node);
      }
      neighbors.forEach((neighbor) => {
        this.graph.setEdge(node, neighbor);
      });
    }
  }
}
