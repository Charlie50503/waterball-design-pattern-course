import { AirConditioner } from "./app/airConditioner";
import { Controller } from "./app/controller";
import { Fan } from "./app/fan";
import rl from "./app/helper/readline";
import { Television } from "./app/television";

async function main(){
  const ac = new AirConditioner();
  const fan = new Fan();
  const tv = new Television();
  const controller = new Controller(
    ac,
    fan,
    tv
  );

  while(true){
    await controller.handlePress();
  }
}



main();