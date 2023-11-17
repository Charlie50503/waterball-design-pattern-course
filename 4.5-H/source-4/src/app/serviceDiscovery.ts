import * as fs from 'fs';
import * as util from 'util';
const readFile = util.promisify(fs.readFile);
// 需要再實體化後補上 initialize 調用
export class ServiceDiscovery {
  private hostToIPMap: Map<string, string[]> = new Map();
  private temporaryUnavailableIPs: Map<string, number>;

  constructor() {
    this.temporaryUnavailableIPs = new Map();
  }

  public resolveIP(host: string) {
    const ips = this.getIps(host);
    const ip = ips[0];

    if (!ip) {
      throw Error(`沒找到可用IP`);
    }
    return ip;
  }

  public getIps(host: string) {
    const ips = this.hostToIPMap.get(host);
    if (!ips || ips.length === 0) {
      return [host];
    }

    const newIps = ips.filter(
      (ip) =>
        !this.temporaryUnavailableIPs.has(ip) ||
        Date.now() > this.temporaryUnavailableIPs.get(ip)!
    );
    if (newIps.length === 0) {
      return [host];
    }
    return newIps;
  }

  public markIPAsUnavailable(ip: string) {
    this.temporaryUnavailableIPs.set(ip, Date.now() + 10 * 60 * 1000); // 標記為 10 分鐘後恢復
  }

  public async initialize(hostConfigFilePath: string) {
    try {
      const fileString = await readFile(hostConfigFilePath, 'utf-8');
      this.setupHostToIPMap(fileString);
    } catch (error) {
      console.log(error);
    }
  }

  private setupHostToIPMap(str: string) {
    const lines = str.split(/\r?\n/);

    lines.forEach((line: string) => {
      const parts = line.split(':');
      const hostname = parts[0].trim();
      const IPList = parts[1]
        .trim()
        .split(',')
        .map((ip) => ip.trim());
      this.hostToIPMap.set(hostname, IPList);
    });
  }
}
