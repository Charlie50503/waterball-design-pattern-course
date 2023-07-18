export class Stack<T> {
  private _items: T[] = [];

  push(item: T) {
    this._items.push(item);
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this._items.pop();
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this._items[this._items.length - 1];
  }

  size(): number {
    return this._items.length;
  }

  clear() {
    this._items = [];
  }
}