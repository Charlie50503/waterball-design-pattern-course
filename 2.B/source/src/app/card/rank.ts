export type RankText = '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A' | '2';
export type RankValue = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export type Rank = {
  text: RankText;
  value: RankValue;
};

export const ranks: Rank[] = [
  {
    text: '3',
    value: 3,
  },
  {
    text: '4',
    value: 4,
  },
  {
    text: '5',
    value: 5,
  },
  {
    text: '6',
    value: 6,
  },
  {
    text: '7',
    value: 7,
  },
  {
    text: '8',
    value: 8,
  },
  {
    text: '9',
    value: 9,
  },
  {
    text: '10',
    value: 10,
  },
  {
    text: 'J',
    value: 11,
  },
  {
    text: 'Q',
    value: 12,
  },
  {
    text: 'K',
    value: 13,
  },
  {
    text: 'A',
    value: 14,
  },
  {
    text: '2',
    value: 15,
  },
];
