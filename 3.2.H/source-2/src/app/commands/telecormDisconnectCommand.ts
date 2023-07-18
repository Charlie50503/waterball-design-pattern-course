import { Telecom } from '../telecom';
import { Command } from './baseCommand';

export class TelecomDisconnectCommand extends Command {
  private readonly _telecom: Telecom;
  constructor(telecom: Telecom) {
    super();
    this._telecom = telecom;
  }

  public getName(): string {
    return "DisconnectTelecom";
  }

  public execute(): void {
    this._telecom.disconnect();
  }

  public undo(): void {
    this._telecom.connect();
  }
}
