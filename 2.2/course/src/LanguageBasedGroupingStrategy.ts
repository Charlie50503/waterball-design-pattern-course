import { Group } from "./group";
import { Student } from "./student";

export class LanguageBasedGroupingStrategy {
  minSize: number = 6;

  group(students: Student[]): Group[] {
    const firstCut: {
      [key: string]: Group
    } = {}
    students.forEach(student => {
      if (!firstCut.hasOwnProperty(student.language)) {
        firstCut[student.language] = new Group(++Object.keys(firstCut).length);
      }
      firstCut[student.language].addStudent(student);
    })

    const secondCut: Array<Group> = [];

    Object.keys(firstCut).forEach(language => {
      let group = firstCut[language]
      secondCut.push(...group.splitGroup(this.minSize));
    })

    const nonFullGroups: Group[] = [];
    const fullGroups: Group[] = [];

    for (let group of secondCut) {
      if (group.students.length < this.minSize) {
        nonFullGroups.push(group);
      } else {
        fullGroups.push(group);
      }
    }


    for (let nonFullGroup of nonFullGroups) {
      for (let fullGroup of fullGroups) {
        // Only merge groups that use the same language
        if (fullGroup.students[0].language === nonFullGroup.students[0].language) {
          console.log(`Merge group (${nonFullGroup.groupNumber}) to (${fullGroup.groupNumber}).`);
          fullGroup.merge(nonFullGroup);
          break;
        }
      }
    }

    return fullGroups;
  }
}