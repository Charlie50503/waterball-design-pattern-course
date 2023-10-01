
import * as util from 'util';
import * as fs from 'fs';
import { Database } from './interfaces/database';
import { readlineService } from './services/readline.service';
import { readlineValidation } from './services/readline.validation';


export type FilePath = string;
const readFile = util.promisify(fs.readFile);

const FILE_PATH =
  'D:\\project\\homework\\waterball-design-pattern-course\\4.3.H\\source\\src\\data.txt';

export class EmployeeCLI {
  private database!: Database;

  constructor(database: Database) {
    this.database = database;
  }

  public async start() {
    try {
      const fileString = await readFile(FILE_PATH, 'utf-8');
      this.parse(fileString)!;
      while (true) {
        const operation = await readlineService.getValidUserInput(
          '選擇功能：(1) 新增一筆員工資料 (2) 透過id查詢一筆員工資料 (3) 取得直屬下屬資料\r\n',
          readlineValidation.isValidChoiceOperation
        );
        switch (operation) {
          case '1':
            await this.addEmployee();
            break;
          case '2':
            await this.getEmployeeById();
            break;
          case '3':
            await this.getEmployeeSubordinates();
            break;
        }
      }
    } catch (error) {}
  }

  public async addEmployee() {
    const operation = await readlineService.getValidUserInput(
      '請輸入一筆員工資料，格式為name age subordinateIds， 例如waterball 25 1,2,3\r\n',
      readlineValidation.isValidEmployeeCreate
    );
    const [name, age, subordinateIds] = operation.split(' ');
    const subordinateIdsArray = subordinateIds.split(',');
    const isSubordinateIdsNumber = subordinateIdsArray.map((id) => +id);
    const id = this.database.size() + 1;
    this.database.create(id, name, +age, isSubordinateIdsNumber);
  }

  public async getEmployeeById() {
    const operation = await readlineService.getValidUserInput(
      '請輸入員工id\r\n',
      readlineValidation.isValidChoiceOperation
    );
    console.log(this.database.getEmployeeById(+operation));
  }

  public async getEmployeeSubordinates() {
    const operation = await readlineService.getValidUserInput(
      '請先輸入要查詢的員工id\r\n',
      readlineValidation.isValidChoiceOperation
    );
    this.database.getSubordinates(+operation)?.forEach((employee) => {
      console.log(employee);
    })
  }

  private parse(script: string) {
    try {
      const lines: string[] = script.split('\r\n');
      const header: string[] = lines.shift()!.split(' ');
      for (const line of lines) {
        const node = line.split(' ');
        const subordinateIds = node[3]?.split(',').map((id: string) => +id)
        this.database.create(
          +node[0],
          node[1],
          +node[2],
          subordinateIds ? subordinateIds : []
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}
