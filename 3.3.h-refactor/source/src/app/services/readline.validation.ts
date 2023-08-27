export class ReadlineValidation {
  isValidHeroActionOperation(operation: string) {
    if (/^0$|^1$/.test(operation)) {
      return true;
    }
    return false;
  }
  isValidHeroMoveOperation(operation: string) {
    if (/^[0-3]$/.test(operation)) {
      return true;
    }
    return false;
  }
}

export const readlineValidation = new ReadlineValidation();
