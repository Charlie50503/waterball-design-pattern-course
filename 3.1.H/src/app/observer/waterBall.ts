import { Channel } from '../channel';
import { Video } from '../video';
import { Observer } from './observer';

export class WaterBallObserver extends Observer {
  update(channel: Channel,video:Video): void {
    if (video.length >= 180) {
      console.log(`${this.name} 對影片 "${video.title}" 按讚`);
    }
  }
}
