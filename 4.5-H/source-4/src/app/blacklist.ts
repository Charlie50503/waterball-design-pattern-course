import { FailedIPError } from "./helper/error";

export class Blacklist {
  blacklistedHosts: Set<string>;
  constructor(blacklistedHosts: string[]) {
    this.blacklistedHosts = new Set(blacklistedHosts);
  }

  public checkBlacklist(host: string): void {
    if (this.blacklistedHosts.has(host)) {
      throw new FailedIPError(host,`${host} 是黑名單`);
    }
    return;
  }
}
