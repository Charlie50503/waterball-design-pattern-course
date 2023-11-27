import { getLogger } from '../app/loggerRepository';
import { AI } from './player/ai';

export class Game {
  private log = getLogger('app.game')!;

  private players = [
    new AI('AI 1'),
    new AI('AI 2'),
    new AI('AI 3'),
    new AI('AI 4'),
  ];

  public start() {
    this.log.info('The game begins.');

    // 每個 AI 玩家輪流做決策
    this.players.forEach((player) => {
      this.log.trace('The player *{ai.getName()}* begins his turn.');
      player.makeDecision();
      this.log.trace('The player *{ai.getName()}* finishes his turn.');
    });

    this.log.debug('Game ends.');
  }
}
