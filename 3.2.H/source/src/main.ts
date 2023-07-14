import { TelecomConnectCommand } from './app/commands/telecormConnectCommand';
import { TankMoveBackwardCommand } from './app/commands/tankMoveBackwardCommand';
import { TankMoveForwardCommand } from './app/commands/tankMoveForwardCommand';
import { MainController } from './app/mainController';
import { Tank } from './app/tank';
import { Telecom } from './app/telecom';
import { TelecomDisconnectCommand } from './app/commands/telecormDisconnectCommand';
function main() {
  const tank = new Tank();
  const telecom = new Telecom();

  const mainController = new MainController([
    new TankMoveForwardCommand(tank),
    new TankMoveBackwardCommand(tank),
    new TelecomConnectCommand(telecom),
    new TelecomDisconnectCommand(telecom),
  ]);

  mainController.start();
}

main();