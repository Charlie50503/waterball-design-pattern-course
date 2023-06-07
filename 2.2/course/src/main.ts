import { LanguageBasedGroupingStrategy } from './LanguageBasedGroupingStrategy';
import { Group } from './group';
import { StudentReader } from './statudetReader';

function main() {
  try {
    let languageBasedGroupingStrategy = new LanguageBasedGroupingStrategy();
    const studentReader = new StudentReader();
    studentReader.readFile('../student.data');
    const students = studentReader.getStudents();
    let groups = languageBasedGroupingStrategy.group(students);

    printGroups(groups);
    console.log();
    
  } catch (err) {
    console.error(err);
  }


}

function printGroups(groups:Group[]){
  groups.forEach(group=>{
    console.log(group.groupNumber);
  })
}

main();
