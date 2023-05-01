import Big from "big.js";
import { Journey } from "./journey";
import { Student } from "./student";
import { Chapter } from "./chapter";
import { Mission } from "./mission";
import { VideoScene } from "./scene/videoScene";
import { Challenge } from "./challenge";

class Main {


  setupChapters() {
    const challenge = new Challenge("第一個任務", 1);
    const mission = new Mission(1, "OOA", challenge, [
      new VideoScene("第1個影片", 1, 300),
      new VideoScene("第2個影片", 2, 300),
      new VideoScene("第3個影片", 3, 300),
      new VideoScene("第4個影片", 4, 300),
    ])
    const missions = [mission]
    const chapter = new Chapter("物件導向新手村", 1, missions);
    return [chapter]
  }

  setup() {
    // 註冊學生
    const student = new Student("johnny", "password", new Array(), new Array())
    // 開設旅程
    const journey = new Journey("軟體設計模式精通之旅", "說明", new Big(10000), this.setupChapters(), new Array(), new Array())

    // 學員參與旅程
    const adventurer = journey.join(student);
    const tourGroup = adventurer.tourGroup;
    const adventurers = tourGroup.adventurers;

    // 查看學員目前正在執行的第一巷任務
    const missionCarryOn = student.getMissionCarryOns()[0];
    console.log("學員目前正在執行的第一項任務", student.getAccount(),missionCarryOn.mission.name);
    
    // 完成這項任務
    missionCarryOn.complete();
  }


}

const main = new Main();
main.setup();

