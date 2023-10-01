import { Database } from './interfaces/database';
import { Employee } from './interfaces/employee';
import { RealDatabase } from './realDatabase';

export class RealDatabaseProxy implements Database {
  super!: RealDatabase;

  public getEmployeeById(id: number): Employee | undefined {
    if (!this.super) {
      this.super = new RealDatabase();
    }
    return this.super.getEmployeeById(id);
  }

  public create(
    id: number,
    name: string,
    age: number,
    subordinateIds: number[]
  ): void {
    if (!this.super) {
      this.super = new RealDatabase();
    }
    return this.super.create(id, name, age, subordinateIds);
  }

  public getSubordinates(id: number): Employee[] | undefined {
    if (!this.super) {
      this.super = new RealDatabase();
    }
    return this.super.getSubordinates(id);
  }

  public size(): number {
    if (!this.super) {
      this.super = new RealDatabase();
    }
    return this.super.size();
  }
}
