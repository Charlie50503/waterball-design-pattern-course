import { Blacklist } from './app/blacklist';
import { FailedIPError } from './app/helper/error';
import { ErrorHandler } from './app/helper/errorHandler';
import { BlacklistDecorator } from './app/httpClient/decorator/blacklistDecorator';
import { LoadBalancerDecorator } from './app/httpClient/decorator/loadBalancerDecorator';
import { ServiceDiscoveryDecorator } from './app/httpClient/decorator/serviceDiscoveryDecorator';
import { FakeHttpClient } from './app/httpClient/fakeHttpClient';
import { HttpRequest } from './app/httpClient/httpRequest';
import { LoadBalancer } from './app/loadBalancer';
import { ServiceDiscovery } from './app/serviceDiscovery';

async function main() {
  const serviceDiscovery = new ServiceDiscovery();

  await serviceDiscovery.initialize(
    'D:\\project\\homework\\waterball-design-pattern-course-2\\4.5-H\\source-2\\src\\hosts'
  );
  const loadBalancer = new LoadBalancer(serviceDiscovery);
  const blacklist = new Blacklist(['']);
  const errorHandler = new ErrorHandler(serviceDiscovery);
  // const httpClient = new BlacklistDecorator(
  //   new ServiceDiscoveryDecorator(
  //     new LoadBalancerDecorator(new FakeHttpClient(), loadBalancer),
  //     serviceDiscovery
  //   ),
  //   blacklist
  // );
  // const httpClient = new ServiceDiscoveryDecorator(
  //   new LoadBalancerDecorator(
  //     new BlacklistDecorator(new FakeHttpClient(), blacklist),
  //     loadBalancer
  //   ),
  //   serviceDiscovery
  // );
  const httpClient = new BlacklistDecorator(
    new LoadBalancerDecorator(
      new ServiceDiscoveryDecorator(new FakeHttpClient(), serviceDiscovery),
      loadBalancer
    ),
    blacklist
  );

  // const httpClient = new ServiceDiscoveryDecorator(
  //   new FakeHttpClient(),
  //   serviceDiscovery
  // );
  // const httpClient = new BlacklistDecorator(
  //   new FakeHttpClient(),
  //   blacklist
  // );
  // const httpClient = new BlacklistDecorator(
  //   new ServiceDiscoveryDecorator(new FakeHttpClient(), serviceDiscovery),
  //   blacklist
  // );
  // const httpClient = new ServiceDiscoveryDecorator(
  //   new BlacklistDecorator(new FakeHttpClient(), blacklist),
  //   serviceDiscovery
  // );

  httpClient
    .sendRequest(new HttpRequest('http://google.com/mail', 'GET'))
    .catch(errorHandler.handleRequestError);
  httpClient
    .sendRequest(new HttpRequest('http://waterballsa.tw/mail', 'GET'))
    .catch(errorHandler.handleRequestError);
  // serviceDiscovery.markIPAsUnavailable('35.21.35.18');
  // await sleep(1000);
  httpClient
    .sendRequest(new HttpRequest('http://waterballsa.tw/mail', 'GET'))
    .catch(errorHandler.handleRequestError);
}

main();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
