import { Channel } from "./app/channel";
import { FireBallObserver } from "./app/observer/fireBall";
import { WaterBallObserver } from "./app/observer/waterBall";
import { Video } from "./app/video";

function main(){
  const waterBallSchoolChannel = new Channel('水球軟體學院');
  const pweDiePieChannel = new Channel('PweDiePie');

  const waterBall = new WaterBallObserver('水球');
  const fireBall = new FireBallObserver('火球');

  waterBallSchoolChannel.subscribe(waterBall);
  pweDiePieChannel.subscribe(waterBall);
  waterBallSchoolChannel.subscribe(fireBall);
  pweDiePieChannel.subscribe(fireBall);

  waterBallSchoolChannel.uploadVideo(new Video('C1M1S', '這個世界正是物件導向的呢!', 240));
  pweDiePieChannel.uploadVideo(new Video('Hello guys', 'Clickbait', 30));
  waterBallSchoolChannel.uploadVideo(new Video('C1M3S', '物件 vs 類別', 60));
  pweDiePieChannel.uploadVideo(new Video('Minecraft', `Let's play Minecraft`, 30*60));
}


main();