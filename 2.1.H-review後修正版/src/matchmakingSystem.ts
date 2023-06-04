import { Individual } from "./individual";
import { MatchBasedItem } from "./interface";
import { MatchmakingStrategy } from "./matchmakingStrategy";

export class MatchmakingSystem {
  individualList: Individual[] = [];


  addIndividual(individual: Individual) {
    this.individualList.push(individual);
  }

  matchmakingStrategy: MatchmakingStrategy;

  constructor(matchmakingStrategy: MatchmakingStrategy) {
    this.matchmakingStrategy = matchmakingStrategy
  }
  match() {
    
    this.individualList.forEach(i=>{
      const otherIndividuals = this.individualList.filter(
        (otherIndividual) => otherIndividual !== i
      )
      const bestList = this.findBestMatch(i, otherIndividuals)
      console.log(`用戶 ${i.name} 與 ${bestList[0].individual.name} 配對成功`);
    })
  }

  findBestMatch(i: Individual, individualList: Individual[]): MatchBasedItem[] {
    return this.matchmakingStrategy.sortMatchmaking(i, individualList)
  }
}