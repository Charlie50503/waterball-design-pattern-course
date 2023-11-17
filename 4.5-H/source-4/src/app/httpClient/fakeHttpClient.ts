import { HttpClient } from './httpClient.interface';
import { HttpRequest } from './httpRequest';

export class FakeHttpClient implements HttpClient {
  public async sendRequest(request: HttpRequest): Promise<void> {
    console.log('[SUCCESS] ' + request.getURL().getFullURL());
  }
}
