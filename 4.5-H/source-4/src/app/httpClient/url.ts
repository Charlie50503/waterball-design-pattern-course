export class URLObject {
  private scheme!: 'http' | 'https';
  private host!: string;
  private path!: string;

  constructor(url: string) {
    this.parse(url);
  }

  private parse(url: string) {
    // 解構 url
    // 如: https://www.google.com/search
    try {
      const [scheme, hostAndPath] = url.split('://');
      const [host, ...paths] = hostAndPath.split('/');
      this.scheme = scheme as 'http' | 'https';
      this.host = host;
      this.path = paths.join('/');
    } catch (error) {
      console.log('網址不正確');
    }
  }

  public getHost() {
    return this.host;
  }

  public setHost(host: string) {
    this.host = host;
  }

  public getPath() {
    return this.path;
  }

  public getScheme() {
    return this.scheme;
  }

  public getFullURL() {
    return `${this.scheme}://${this.host}/${this.path}`;
  }
}
