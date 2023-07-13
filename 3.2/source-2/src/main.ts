import { AirConditioner } from './app/airConditioner';
import { FanNextLevelCommand } from './app/commands/fanNextLevelCommand';
import { FanPreviousLevelCommand } from './app/commands/fanPreviousLevelCommand';
import { TurnOffAirConditionerCommand } from './app/commands/turnOffAirConditionerCommand';
import { TurnOffTvCommand } from './app/commands/turnOffTvCommand';
import { TurnOnAirConditionerCommand } from './app/commands/turnOnAirConditionerCommand';
import { TurnOnTvCommand } from './app/commands/turnOnTvCommand';
import { Controller } from './app/commons/controller';
import { Fan } from './app/commons/fan';
import { Television } from './app/commons/television';

async function main() {
  const ac = new AirConditioner();
  const fan = new Fan();
  const tv = new Television();
  const controller = new Controller();

  controller.setCommand(0, new FanNextLevelCommand(fan));
  controller.setCommand(1, new FanPreviousLevelCommand(fan));
  controller.setCommand(2, new TurnOnAirConditionerCommand(ac));
  controller.setCommand(3, new TurnOffAirConditionerCommand(ac));
  controller.setCommand(4, new TurnOnTvCommand(tv));
  controller.setCommand(5, new TurnOffTvCommand(tv));

  while (true) {
    await controller.handlePress();
  }
}

main();
