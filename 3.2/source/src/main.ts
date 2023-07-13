import { AirConditioner } from "./app/airConditioner";
import { Controller } from "./app/controller";
import { Fan } from "./app/fan";
import { Television } from "./app/television";

function main(){
  const ac = new AirConditioner();
  const fan = new Fan();
  const tv = new Television();
  const controller = new Controller(
    ac,
    fan,
    tv
  );

  controller.press0();
  controller.press1();
  controller.press2();
  controller.press3();
  controller.press4();
  controller.press5();
}

main();