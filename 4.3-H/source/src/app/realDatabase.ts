import { Database } from './interfaces/database';
import { Employee } from './interfaces/employee';
import { RealEmployee } from './realEmployee';

export class RealDatabase implements Database {
  employees: Employee[] = [];
  public getEmployeeById(id: number): Employee | undefined {
    return this.employees[id - 1];
  }

  public create(id: number, name: string, age: number, subordinateIds: number[]) {
    if (this.isEmployeeIdExists(id)) {
      console.log('id 重複');
    }
    this.employees.push(new RealEmployee(id, name, age, subordinateIds));
  }

  private isEmployeeIdExists(id: number) {
    return this.employees.some((employee) => {
      return employee.id === id;
    });
  }

  public getSubordinates(id: number): Employee[] | undefined {
    const employee = this.getEmployeeById(id);

    // 如果找不到該員工，回傳 undefined
    if (!employee) {
      return undefined;
    }

    // 如果找到了員工但他沒有下屬，回傳空陣列
    if (!employee.subordinateIds || employee.subordinateIds.length === 0) {
      return [];
    }

    // 使用 map 遍歷每個下屬的 ID，並使用 getEmployeeById 取得其詳細資訊
    return employee.subordinateIds.map((subordinateId) => {
      const subordinate = this.getEmployeeById(subordinateId);
      if (!subordinate) {
        throw new Error(`Subordinate with ID ${subordinateId} not found`);
      }
      return subordinate;
    });
  }

  public size() {
    return this.employees.length;
  }
}
