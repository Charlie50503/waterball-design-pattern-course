import { Employee } from './employee';

export interface Database {
  getEmployeeById(id: number): Employee | undefined;
  getSubordinates(id: number): Employee[] | undefined;
  create(id: number, name: string, age: number, subordinateIds: number[]): void;
  size(): number;
}
