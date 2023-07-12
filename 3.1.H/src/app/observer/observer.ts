import { Channel } from '../channel';
import { Video } from './../video';
export abstract class Observer {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract update(channel: Channel, video: Video): void;
}
