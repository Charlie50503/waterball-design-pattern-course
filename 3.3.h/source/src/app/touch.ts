import { MapObject, mapObjectType } from './mapObject/mapObject.interface';
import { Role } from './mapObject/role';

export class GameTouch {
  toucher: Role;
  touchee: MapObject;

  constructor(toucher: Role, touchee: MapObject) {
    this.toucher = toucher;
    this.touchee = touchee;
  }

  onTouch() {
    switch(this.touchee.getType()) {
      case mapObjectType.obstacle:
      case mapObjectType.hero:
      case mapObjectType.monster:
          return EWhenTouchedAction.stop;
      case mapObjectType.treasure:
          return EWhenTouchedAction.getState;

      default:
          throw new Error("未知的地圖物體類型");
  }
  }
}

export enum EWhenTouchedAction {
  move,
  attack,
  stop,
  getState,
}
