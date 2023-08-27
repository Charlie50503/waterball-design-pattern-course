export interface FileParser<T> {
  parse(filePath: string): Promise<T>;
}
