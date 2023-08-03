import { GameMap } from './map';
import { mapObjectType } from './mapObject/mapObject.interface';
import { Accelerated } from './state/accelerated';
import { Erupting } from './state/erupting';

export class Round {
  map: GameMap;

  constructor(map: GameMap) {
    this.map = map;
  }

  async start() {
    this.onRoundStart();
    for (const role of this.map.roles) {
      if (role.isAlive) {
        await role.state.onAct();
      }
      if(this.isHeroDead()){
        return;
      }
    }
    this.onRoundEnd();
  }

  onRoundStart() {
    console.log('回合開始');
    if(this.map.roles[0].getType() === mapObjectType.hero){
      this.printHeroState();
    }
    this.map.roles.forEach((role) => {
      role.state.onRoundStart();
    });

    // test state
    
  }

  onRoundEnd() {
    this.map.roles.forEach((role) => {
      role.state.onRoundEnd();
    });
    this.map.removeDeadRole();

    console.log('回合結束');
  }

  printHeroState(){
    console.log("Hero HP:", this.map.roles[0].getHp() , "目前狀態", this.map.roles[0].state.getName());
  }

  isHeroDead(){
    return this.map.roles[0].isDead();
  }
}
