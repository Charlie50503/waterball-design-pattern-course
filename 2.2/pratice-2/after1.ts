export abstract class NewTemplate {
  value;
  loop(messages: string[]) {
    messages.forEach(this.loopFn);
  }

  setDefaultValue(value) {
    this.value = value;
  }

  print(message: string) {
    console.log(message);
  }

  returnResult() {}

  loopFn(message: string, index: number) {}

 abstract search<T>(messages:string[]):T
}

class SearchLongestMessage {
  public search(messages: string[]): string {
    let maxLengthMessage = '';
    // loop messages array (遍歷所有messages)
    for (let message of messages) {
      // (找到最長message)
      if (message.length > maxLengthMessage.length) {
        maxLengthMessage = message;
      }
      // 印出當下 message
      console.log(message);
    }
    // (回傳最長message)
    return maxLengthMessage;
  }
}
class SearchLongestMessageNew<T> extends NewTemplate {
  constructor() {
    super();
  }

  search<T>(messages: string[]) {
    this.setDefaultValue('');
    this.loop(messages);
    return this.value
  }

  loopFn(message: string, index: number): void {
    let mexMessage = this.value;
    if (message.length > mexMessage.length) {
      this.value = message;
    }
    // 印出當下 message
    return this.returnResult()
  }

  returnResult(){
    return this.value
  }
}
