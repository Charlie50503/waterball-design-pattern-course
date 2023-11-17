import { HttpRequest } from './httpRequest';

export interface HttpClient {
  sendRequest(request: HttpRequest): Promise<void>;
}
