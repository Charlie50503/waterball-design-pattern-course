import { MyText } from './text';

export class BasicText extends MyText {
  protected generate(): void {
    this.result = this.content.toUpperCase().split('');
  }
}
