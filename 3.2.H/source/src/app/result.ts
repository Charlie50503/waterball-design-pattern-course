export class Result<T> {
  isSuccess: boolean;
  message: string;
  data: T;

  constructor(isSuccess: boolean, message: string, data: T) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.data = data;
  }
}

export class SuccessResult<T> extends Result<T> {
  constructor(data: T) {
    super(true, 'Success', data);
  }
}

export class FailResult extends Result<null> {
  constructor(message: string) {
    super(false, message, null);
  }
}
