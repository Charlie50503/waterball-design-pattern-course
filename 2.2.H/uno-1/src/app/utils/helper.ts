export function toSpliced<T>(array: T[], start: number, deleteCount: number, ...items: T[]): T[] {
  return array.slice(0, start)
              .concat(items)
              .concat(array.slice(start + deleteCount));
}
