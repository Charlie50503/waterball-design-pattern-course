import { TelecomConnectCommand } from './app/commands/telecormConnectCommand';
import { TankMoveBackwardCommand } from './app/commands/tankMoveBackwardCommand';
import { TankMoveForwardCommand } from './app/commands/tankMoveForwardCommand';
import { MainController } from './app/mainController';
import { Tank } from './app/tank';
import { Telecom } from './app/telecom';
import { TelecomDisconnectCommand } from './app/commands/telecormDisconnectCommand';
import { MainControlKeyboardResetCommand } from './app/commands/ResetMainControlKeyboardCommand';
function main() {
  const tank = new Tank();
  const telecom = new Telecom();
  const mainController = new MainController();

  mainController.setCommand(new TankMoveForwardCommand(tank))
  mainController.setCommand(new TankMoveBackwardCommand(tank))
  mainController.setCommand(new TelecomConnectCommand(telecom))
  mainController.setCommand(new TelecomDisconnectCommand(telecom))
  mainController.setCommand(new MainControlKeyboardResetCommand(mainController))

  mainController.start();
}

main();