import { Blacklist } from '../../blacklist';
import { LoadBalancer } from '../../loadBalancer';
import { ServiceDiscovery } from '../../serviceDiscovery';
import { HttpClient } from '../httpClient.interface';
import { HttpRequest } from '../httpRequest';
import { httpClientDecorator } from './httpClientDecorator';

export class ServiceDiscoveryDecorator extends httpClientDecorator {
  private serviceDiscovery: ServiceDiscovery;
  constructor(next: HttpClient, loadBalancer: ServiceDiscovery) {
    super(next);
    this.serviceDiscovery = loadBalancer;
  }

  public async sendRequest(request: HttpRequest): Promise<void> {
    request
      .getURL()
      .setHost(this.serviceDiscovery.resolveIP(request.getURL().getHost()));
    this.next.sendRequest(request);
  }
}
