export class FailedIPError extends Error {
  constructor(public ip: string, message?: string) {
    super(message || `Failed to connect to IP: ${ip}`);
    this.name = 'FailedIPError';
    // 維護原型鏈
    Object.setPrototypeOf(this, FailedIPError.prototype);
  }
}
