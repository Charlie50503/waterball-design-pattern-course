import { MyText } from '../../core/text';

export class PrettyText extends MyText {
  protected generate(): void {
    this.result = this.content.toUpperCase().split('');
  }
}
