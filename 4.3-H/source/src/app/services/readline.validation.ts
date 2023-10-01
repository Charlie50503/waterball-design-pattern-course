export class ReadlineValidation {
  isValidChoiceOperation(operation: string) {
    if (/^[1-9]\d*$/.test(operation)) {
      return true;
    }
    return false;
  }

  isValidEmployeeCreate(operation: string) {
    if(operation.split(" ").length !== 3){
      return false;
    }
    const [name, age, subordinateIds] = operation.split(" ");

    if(isNaN(Number(age))){
      return false;
    }

    const subordinateIdsArray = subordinateIds.split(",");
    const isSubordinateIdsNumber = subordinateIdsArray.every(id => {
      if(isNaN(Number(id))){
        return false;
      }
      return true;
    })
    if(!isSubordinateIdsNumber){
      return false
    }
    return true
  }

  isValidId(operation: string) {
    if(isNaN(Number(operation))){
      return false
    }
    return true
  }
}

export const readlineValidation = new ReadlineValidation();
