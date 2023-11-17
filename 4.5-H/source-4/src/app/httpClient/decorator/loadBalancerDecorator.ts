import { Blacklist } from '../../blacklist';
import { LoadBalancer } from '../../loadBalancer';
import { HttpClient } from '../httpClient.interface';
import { HttpRequest } from '../httpRequest';
import { httpClientDecorator } from './httpClientDecorator';

export class LoadBalancerDecorator extends httpClientDecorator {
  private loadBalancer: LoadBalancer;
  constructor(next: HttpClient, loadBalancer: LoadBalancer) {
    super(next);
    this.loadBalancer = loadBalancer;
  }

  public async sendRequest(request: HttpRequest): Promise<void> {
    request
      .getURL()
      .setHost(this.loadBalancer.getNextIP(request.getURL().getHost()));
    this.next.sendRequest(request);
  }
}
