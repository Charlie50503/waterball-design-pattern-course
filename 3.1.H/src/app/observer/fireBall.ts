import { Channel } from '../channel';
import { Video } from '../video';
import { Observer } from './observer';

export class FireBallObserver extends Observer {
  update(channel: Channel,video:Video): void {
    if (video.length <= 60) {
      channel.unsubscribe(this);
    }
  }
}
