import { Observer } from './observer/observer';
import { Video } from './video';

export class Channel {
  videoList: Video[] = [];
  name: string;

  observers: Observer[] = [];

  constructor(name: string) {
    this.name = name;
  }

  notify(video: Video): void {
    this.observers.forEach((observer) => observer.update(this, video));
  }

  subscribe(o: Observer) {
    this.observers.push(o);
    console.log(`${o.name} 訂閱了 ${this.name}`);
  }
  unsubscribe(o: Observer) {
    this.observers.splice(this.observers.indexOf(o), 1);
    console.log(`${o.name} 解除訂閱了 ${this.name}`);
  }
  uploadVideo(video: Video) {
    console.log(`頻道 ${this.name} 上架了新的影片 "${video.title}"`);

    this.videoList.push(video);
    this.notify(video);
  }
}
