import { HttpClient } from '../httpClient.interface';
import { HttpRequest } from '../httpRequest';

export abstract class httpClientDecorator implements HttpClient {
  protected next: HttpClient;

  constructor(next: HttpClient) {
    this.next = next;
  }

  public abstract sendRequest(request: HttpRequest): Promise<void>;
}
