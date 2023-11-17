import { Blacklist } from '../../blacklist';
import { HttpClient } from '../httpClient.interface';
import { HttpRequest } from '../httpRequest';
import { httpClientDecorator } from './httpClientDecorator';

export class BlacklistDecorator extends httpClientDecorator {
  private blacklist: Blacklist;
  constructor(next: HttpClient, blacklist: Blacklist) {
    super(next);
    this.blacklist = blacklist;
  }

  public async sendRequest(request: HttpRequest): Promise<void> {
    this.blacklist.checkBlacklist(request.getURL().getHost());
    this.next.sendRequest(request);
  }
}
