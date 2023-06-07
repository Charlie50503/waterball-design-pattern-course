import { Student } from "./student";

export class Group {
  groupNumber: number;
  students: Student[] = [];

  constructor(groupNumber: number) {
    this.groupNumber = groupNumber;

  }

  merge(group: Group): void {
    this.students.push(...group.students);
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  splitGroup(size: number): Group[] {
    let groups:Group[] = []

    let groupNumber = 1;
    while (this.students.length > size) {
      let groupStudents = this.students.splice(0,size);
      let newGroup = new Group(groupNumber);
      newGroup.setStudents(groupStudents);
      groups.push(newGroup);
      groupNumber++;      
    }

    return groups
  }

  setStudents(value:Student[]){
    this.students = value
  }
}