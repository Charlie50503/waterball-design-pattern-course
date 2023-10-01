
import { Employee } from './interfaces/employee';
import { RealDatabase } from './realDatabase';
import { RealDatabaseProxy } from './realDatabaseProxy';

export class PasswordProtectionRealDatabaseProxy extends RealDatabaseProxy {

  public override getEmployeeById(id: number): Employee | undefined {
    if (!this.isCorrectPassword()) {
      console.error("密碼錯誤");
      return
    }
    if (!this.super) {
      this.super = new RealDatabase();
    }
    return this.super.getEmployeeById(id);
  }

  private isCorrectPassword() {
    return process.env.PASSWORD==="1qaz2wsx";
  }
}
