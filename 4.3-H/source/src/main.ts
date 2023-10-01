import { EmployeeCLI } from './app/employeeCLI';
import dotenv from 'dotenv';
import { PasswordProtectionRealDatabaseProxy } from './app/passwordProtectionRealDatabaseProxy';
dotenv.config({ path: './local.env' });
async function main() {
  const employeeCLI = new EmployeeCLI(new PasswordProtectionRealDatabaseProxy());
  employeeCLI.start();
}

main();
