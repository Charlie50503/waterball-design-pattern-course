import { URLObject } from './url';

export class HttpRequest {
  private url: URLObject;
  private method: 'GET';

  constructor(url: string, method: 'GET') {
    this.url = new URLObject(url);
    this.method = method;
  }

  public getURL() {
    return this.url;
  }
}
