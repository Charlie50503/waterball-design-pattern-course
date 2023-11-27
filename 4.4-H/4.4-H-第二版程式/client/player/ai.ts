import { getLogger } from '../../app/loggerRepository';
import { Player } from './player';

export class AI implements Player {
  private name: string;
  private log = getLogger('app.game.ai')!;

  constructor(name: string) {
    this.name = name;
  }

  makeDecision() {
    this.log.trace(`${this.name} starts making decisions...`);

    this.log.warn(`${this.name} decides to give up.`);
    this.log.error('Something goes wrong when AI gives up.');

    this.log.trace(`${this.name} completes its decision.`);
  }

  getName() {
    return this.name;
  }
}
