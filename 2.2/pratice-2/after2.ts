export abstract class NewTemplate {
  value;

  abstract loopFn(message: string, index: number): void;

  search(messages: string[]): any {
    this.setDefaultValue();
    messages.forEach(this.loopFn.bind(this));
    return this.value;
  }

  setDefaultValue(): void {}

  print(message: string): void {
    console.log(message);
  }
}
class SearchLongestMessageNew extends NewTemplate {
  setDefaultValue(): void {
    this.value = '';
  }

  loopFn(message: string): void {
    if (message.length > this.value.length) {
      this.value = message;
    }
    this.print(message);
  }
}

class SearchEmptyMessageIndexNew extends NewTemplate {
  setDefaultValue(): void {
    this.value = -1;
  }

  loopFn(message: string, index: number): void {
    if (message === '' && this.value === -1) {
      this.value = index;
    }
    this.print(message);
  }
}
class CountNumberOfWaterBallsNew extends NewTemplate {
  setDefaultValue(): void {
    this.value = 0;
  }

  loopFn(message: string): void {
    if (message === 'WaterBall') {
      this.value++;
    }
    this.print(message);
  }
}