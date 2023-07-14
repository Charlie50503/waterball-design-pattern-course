
import { Telecom } from "../telecom";
import { Command } from "./baseCommand";

export class TelecomConnectCommand extends Command {
  private readonly _telecom:Telecom;
  constructor(telecom:Telecom){
    super();
    this._telecom = telecom;
  }

  public getName(): string {
    return "ConnectTelecom";
  }

  public execute(): void {
    this._telecom.connect();
  }

  public undo(): void {
    this._telecom.disconnect();
  }
}