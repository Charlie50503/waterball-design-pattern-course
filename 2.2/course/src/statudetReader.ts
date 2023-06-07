import * as fs from 'fs';
import * as path from 'path';
import { Student } from './student';

export class StudentReader {
  private students: Student[] = [];
  
  add(student: Student): void {
    this.students.push(student);
  }

  readFile(pathStr:string){
    try {
      const filePath = path.join(__dirname, pathStr);
      const data = fs.readFileSync(filePath, 'utf8');
      const dataArray = data.split("\n");
      dataArray.forEach(item=>{
        this.add(this.transform(item));
      })
    } catch (err) {
      console.error(err);
    }
  }

  transform(item: string): Student {
    const data = item.split(" ");
    const student = new Student(data[0], this.replaceYearToNumber(data[1]), data[2], data[3], data[4].split(","));
    return student;
  }

  replaceYearToNumber(year:string){
    const result = Number(year.replace("y",""))
    if(isNaN(result)){
      throw Error("經驗轉換成數字格式失敗")
    }
    return result;
  }

  getStudents(){
    return this.students
  }
}