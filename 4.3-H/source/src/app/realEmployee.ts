import { Employee } from './interfaces/employee';

export class RealEmployee implements Employee {
  id: number;
  name: string;
  age: number;
  subordinateIds: number[];
  constructor(id: number, name: string, age: number, subordinateIds: number[]) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.subordinateIds = subordinateIds;
  }
}
