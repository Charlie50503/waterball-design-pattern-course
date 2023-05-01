import Big from "big.js";

// 實現一個限制string長度的通用方法 
export function lengthShouldBe<T extends string>(
  str: T,
  maxLength: number
): string {
  if (str.length > maxLength) {
    throw Error(`String length (${str.length}) exceeds maximum length (${maxLength}).`);
  }
  return str;
}

export function lengthInRange<T extends string>(
  str: T,
  minLength: number,
  maxLength: number
): string {
  if (str.length < minLength) {
    throw Error(`String length ${str?.length} exceeds minimum length ${minLength}.`);
  }
  if (str.length > maxLength) {
    throw Error(`String length ${str?.length} exceeds maximum length ${maxLength}.`);
  }
  return str;
}

// create function and content is string should be bigger then input number size
export function lengthShouldBeBiggerThan<T extends Big>(
  str: T,
  minLength: T
): T {
  if (str < minLength) {
    throw Error(`String length (${str}) exceeds minimum length (${minLength}).`);
  }
  return str;
}
