import { MyText } from '../../core/text';

export class BasicText extends MyText {
  protected generate(): void {
    this.result = this.content.split('');
  }
}
