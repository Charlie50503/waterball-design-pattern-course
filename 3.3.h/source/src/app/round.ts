import { GameMap } from './map';

export class Round {
  map: GameMap;

  constructor(map: GameMap) {
    this.map = map;
  }

  async start() {
    this.onRoundStart();
    for (const role of this.map.roles) {
      if (role.isAlive) {
        await role.act();
      }
    }

    this.onRoundEnd();
  }

  onRoundStart() {
    console.log('回合開始');
    this.map.roles.forEach((role) => {
      role.state.onRoundStart();
    });
  }
  onRoundEnd() {
    this.map.roles.forEach((role) => {
      role.state.onRoundEnd();
    });
    this.map.removeDeadRole();

    console.log('回合結束');
  }
}
