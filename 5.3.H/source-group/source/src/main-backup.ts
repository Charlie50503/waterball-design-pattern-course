// interface Position {
//   x: number;
//   y: number;
// }

// abstract class Component {
//   position!: Position;
//   abstract draw(): string;
//   constructor(position: Position) {
//       this.position = position;
//   }
// }

// class Button extends Component {
//   label: string;
//   width: number;
//   height: number;

//   constructor(label: string, width: number, height: number, position: Position) {
//       super(position);
//       this.label = label;
//       this.width = width;
//       this.height = height;
//   }

//   draw(): string {
//       let button = '';
//       // 上邊框
//       button += '┌' + '─'.repeat(this.width - 2) + '┐\n';

//       // 中間部分
//       for (let i = 0; i < this.height - 2; i++) {
//           if (i === Math.floor((this.height - 2) / 2)) {
//               // 居中放置標籤
//               const padding = (this.width - 2 - this.label.length) / 2;
//               button += '│' + ' '.repeat(Math.floor(padding));
//               button += this.label;
//               button += ' '.repeat(Math.ceil(padding)) + '│\n';
//           } else {
//               button += '│' + ' '.repeat(this.width - 2) + '│\n';
//           }
//       }

//       // 下邊框
//       button += '└' + '─'.repeat(this.width - 2) + '┘\n';
//       return button;
//   }
// }

// // // 使用範例
// // const button = new Button("OK", 10, 4, { x: 3, y: 2 });
// // console.log(button.draw());


// class Layout {
//   private grid: string[][];
//   private width: number;
//   private height: number;

//   constructor(width: number, height: number) {
//       this.width = width;
//       this.height = height;
//       this.grid = Array.from({ length: height }, () => new Array(width).fill(' '));
//   }

//   addComponent(component: Component): void {
//       const { x, y } = component.position;
//       this.grid[y][x] = component.draw();
//   }

//   render(): string {
//       return this.grid.map(row => row.join('')).join('\n');
//   }
// }

// // 使用範例
// const layout = new Layout(100, 5);
// const button = new Button("OK", 20, 4, { x: 3, y: 2 });
// button.position = { x: 3, y: 2 };
// layout.addComponent(button);
// console.log(layout.render());
