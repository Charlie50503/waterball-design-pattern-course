import { ServiceDiscovery } from '../serviceDiscovery';
import { FailedIPError } from './error';

export class ErrorHandler {
  private serviceDiscovery: ServiceDiscovery;

  constructor(serviceDiscovery: ServiceDiscovery) {
    this.serviceDiscovery = serviceDiscovery;
    this.handleRequestError = this.handleRequestError.bind(this);
  }
  public handleRequestError(error: Error) {
    if (error instanceof FailedIPError) {
      this.serviceDiscovery.markIPAsUnavailable(error.ip);
    }
    console.log(error);
  }
}
