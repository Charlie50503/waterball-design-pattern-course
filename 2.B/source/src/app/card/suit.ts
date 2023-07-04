// 這裡注意花色必須絕對比數字大
// TODO 花色跟數字的大小比較有優化空間
export type Suit = {
  text: string;
  value: number;
};
export const suits: Suit[] = [
  {
    text: 'C',
    value: 0.1,
  },
  {
    text: 'D',
    value: 0.2,
  },
  {
    text: 'H',
    value: 0.3,
  },
  {
    text: 'S',
    value: 0.4,
  },
];
