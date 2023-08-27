import { EState } from "../enum/state.enum";
import { Role } from "../mapObject/role/role";
import { State } from "./state";

export class Normal extends State {
  constructor(role: Role) {
    super(role);
  }
  protected getDurationRound(): number {
    return 99999;
  }

  public getName(): string {
    return "正常";
  }

  public getType(): EState {
    return EState.Normal;
  }
}
