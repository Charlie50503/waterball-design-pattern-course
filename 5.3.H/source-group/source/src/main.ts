// ┌────────┐
// │        │
// │        │
// │        │
// │ Hello  │
// │        │
// │        │
// │        │
// │        │
// └────────┘

function isStringArrayArray(value: string[][] | string[]): value is string[][] {
  return Array.isArray(value) && Array.isArray(value[0]);
}
function isStringArray(value: string[][] | string[]): value is string[] {
  return Array.isArray(value);
}
const ui = {
  width: 100,
  height: 100,
};

const result: string[][] = [];
function drawUI() {
  for (let index = 0; index < ui.width; index++) {
    const line = [];
    for (let hi = 0; hi < ui.height; hi++) {
      line.push(' ');
    }
    result.push(line);
  }
}

drawUI();

const button = {
  position: {
    x: 1,
    y: 1,
  },
  type: 'button',
  content: [
    ['┌', '-', '-', '-', '-', '┐'],
    ['|', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', '|'],
    ['|', 'H', 'e', 'l', 'l', '|'],
    ['|', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', '|'],
    ['└', '-', '-', '-', '-', '┘'],
  ],
};

const text = {
  position: {
    x: 10,
    y: 1,
  },
  type: 'text',
  content: ['t', 'e', 'x', 't'],
};

const numberedList = {
  position: {
    x: 20,
    y: 1,
  },
  type: 'numberedList',
  content: [
    ['1.', 't', 'e', 'x', 't'],
    ['2.', 'e', 'x', 't'],
    ['3.', 'e', 'x', 't'],
  ],
};

const components = [button, text, numberedList];

function drawComponent(
  component:
    | {
        position: {
          x: number;
          y: number;
        };
        type: string;
        content: string[][];
      }
    | {
        position: {
          x: number;
          y: number;
        };
        type: string;
        content: string[];
      }
) {
  if (component.type === 'text' && isStringArray(component.content)) {
    for (let i = 0; i < component.content.length; i++) {
      result[component.position.y][component.position.x + i] =
        component.content[i];
    }
  } else if (isStringArrayArray(component.content)) {
    component.content.forEach((line, lineIndex) => {
      line.forEach((char, charIndex) => {
        result[component.position.y + lineIndex][
          component.position.x + charIndex
        ] = char;
      });
    });
  }
}

components.forEach((component) => {
  drawComponent(component);
});

result.map((line) => {
  console.log(line.join(''));
});

// 首先畫出 ui 整個外框
// 然後畫出 components 的位置
// loop ui 的整個　ｒｏｗ　跟　ｃｅｌｌ
// 判斷 如果是 該 row index 跟 cell index 符合 component 的 position 就把 component 的 content 替換掉原先的 row 跟 cell
//　補齊邊框樣式
