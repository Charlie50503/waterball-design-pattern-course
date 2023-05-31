// 樣板方法練習

class ClassA {
  public p1(u: number[]) {
    const n: number = u.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (u[j] > u[j + 1]) {
          let mak: number = u[j];
          u[j] = u[j + 1];
          u[j + 1] = mak;
        }
      }
    }
  }
}

class ClassB {
  public p2(k: number[]) {
    const n: number = k.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (k[j] < k[j + 1]) {
          let ppp: number = k[j];
          k[j] = k[j + 1];
          k[j + 1] = ppp;
        }
      }
    }
  }
}

//「先將『變動』之處挖空」

abstract class Template1 {
  compare:(a: number, b: number)=> boolean;
  constructor(compare:(a: number, b: number)=> boolean) {
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
