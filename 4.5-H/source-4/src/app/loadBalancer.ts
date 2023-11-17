import { ServiceDiscovery } from './serviceDiscovery';

export class LoadBalancer {
  private hostToIPIndexMap: Map<string, number> = new Map();
  private serviceDiscovery: ServiceDiscovery;

  constructor(serviceDiscovery: ServiceDiscovery) {
    this.serviceDiscovery = serviceDiscovery;
  }
  public getNextIP(host: string) {
    const ips = this.serviceDiscovery.getIps(host);
    if (!ips || ips.length === 0) {
      return host;
    }

    const currentIndex = this.hostToIPIndexMap.get(host) || 0;
    const nextIndex = (currentIndex + 1) % ips.length;
    this.hostToIPIndexMap.set(host, nextIndex);

    return ips[nextIndex];
  }
}
