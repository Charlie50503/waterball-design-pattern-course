
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

  // isValidConfirmOperation(operation: string) {
  //   if (/^[yYnN]{1}$/.test(operation)) {
  //     return true;
  //   }
  //   return false;
  // }

  // isValidKeyboardOperation(operation: string) {
  //   if (/^[a-zA-Z]$/.test(operation)) {
  //     return true;
  //   }
  //   return false;
  // }

  // isValidCommandIndex(index: string, commands: Command[]) {
  //   if (isNaN(Number(index))) {
  //     return false;
  //   }
  //   if (commands.length < +index || +index < 0) {
  //     return false;
  //   }
  //   return true;
  // }

  // isValidCommandsIndex(indexes: string, commands: Command[]) {
  //   const indexAry = indexes.split(' '); // 0 1 2
  //   if (indexAry.some((item) => isNaN(Number(item)))) {
  //     return false;
  //   }

  //   const indexAryOfNumber = indexAry.map((item) => Number(item));
  //   if (indexAryOfNumber.some((number) => number >= commands.length)) {
  //     return false;
  //   }
  //   return true;
  // }
}
