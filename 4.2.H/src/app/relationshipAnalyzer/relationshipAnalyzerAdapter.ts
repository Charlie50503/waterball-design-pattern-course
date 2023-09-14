import { AdjacencyList, IRelationshipAnalyzer } from './relationshipAnalyzer.interface';
import { SuperRelationshipAnalyzer } from '../superRelationshipAnalyzer/superRelationshipAnalyzer';
import { Graph } from '@dagrejs/graphlib';



export class RelationshipAnalyzerAdapter implements IRelationshipAnalyzer {
  private userNameSet = new Set<string>();
  private graph = new Graph({
    directed: false,
    compound: true,
    multigraph: true,
  });
  private superRelationshipAnalyzer = new SuperRelationshipAnalyzer();

  public parse(script: string) {
    const adjacencyList = this.parseAdjacencyList(script);
    const edges = this.convertToEdges(adjacencyList);
    this.setUserNameSet(script);

    this.superRelationshipAnalyzer.init(edges);
    this.graphInit(adjacencyList);
  }

  public getMutualFriends(name1: string, name2: string): string[] {
    const mutualFriends: string[] = [];
    this.userNameSet.forEach((name) => {
      if (this.superRelationshipAnalyzer.isMutualFriend(name, name1, name2)) {
        mutualFriends.push(name);
      }
    });

    return mutualFriends;
  }

  public hasConnection(name1: string, name2: string) {
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

  private setUserNameSet(input: string) {
    const lines = input.split('\r\n');
    for (const line of lines) {
      const [node, ...neighbors] = line.split(' ');
      const nodeReplaced = node.replace(/\:/g, '');
      this.userNameSet.add(nodeReplaced);
      neighbors.forEach((neighbor) => {
        this.userNameSet.add(neighbor);
      });
    }
  }

  private parseAdjacencyList(input: string): AdjacencyList {
    const adjacencyList: AdjacencyList = {};
    const lines = input.split('\r\n');
    for (const line of lines) {
      const [node, ...neighbors] = line.split(' ');
      const nodeReplaced = node.replace(/\:/g, '');
      adjacencyList[nodeReplaced] = neighbors;
    }
    return adjacencyList;
  }

  private convertToEdges(adjacencyList: AdjacencyList): string {
    let result = '';
    for (const [node, neighbors] of Object.entries(adjacencyList)) {
      for (const neighbor of neighbors) {
        result += `${node} -- ${neighbor}\r\n`;
      }
    }
    return result;
  }
}
