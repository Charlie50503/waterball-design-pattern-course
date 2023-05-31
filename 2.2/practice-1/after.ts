abstract class Template {
  compare: (a: number, b: number) => boolean;
  constructor(compare: (a: number, b: number) => boolean) {
    this.compare = compare;
  }
  public p(k: number[]) {
    const n: number = k.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (this.compare(k[j], k[j + 1])) {
          let ppp: number = k[j];
          k[j] = k[j + 1];
          k[j + 1] = ppp;
        }
      }
    }
  }
}

function compareP(a: number, b: number): boolean {
  return a < b;
}

function compareK(a: number, b: number): boolean {
  return a > b;
}

class Class1 extends Template {
  constructor() {
    super(compareP);
  }
}


class Class2 extends Template {
  constructor() {
    super(compareP);
  }
}
