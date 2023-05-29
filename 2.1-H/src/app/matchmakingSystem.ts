import { Individual } from './individual';
import { MatchTypeStrategy } from './matchTypeStrategy/matchTypeStrategy';

export class MatchmakingSystem {
  individualList: Individual[] = [];

  constructor() {}

  addIndividual(individual: Individual) {
    this.individualList.push(individual);
  }

  startMatch() {
    if (!this.checkIndividualExist()) {
      throw Error('No Individuals in the system');
    }
    this.individualList.forEach((ownIndividual) => {
      const otherIndividuals = this.individualList.filter(
        (otherIndividual) => otherIndividual !== ownIndividual
      )
      this.findBastMatch(ownIndividual, otherIndividuals);
    });
  }

  findBastMatch(individual: Individual, individualList: Individual[]) {
    let bastMatch = individual.match(individualList)[0].individual;
    console.log(`用戶 ${individual.name} 與 ${bastMatch.name} 配對成功`);
  }

  checkIndividualExist() {
    return this.individualList.length > 0 ? true : false;
  }
}
