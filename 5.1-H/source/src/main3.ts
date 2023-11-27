import { Models } from './app/models';

const REFLECTION_PATH =
  'D:\\project\\homework\\waterball-design-pattern-course-2\\5.1-H\\source\\src\\Reflection.mat';
const SCALING_PATH =
  'D:\\project\\homework\\waterball-design-pattern-course-2\\5.1-H\\source\\src\\Scaling.mat';
const SHRINK_PATH =
  'D:\\project\\homework\\waterball-design-pattern-course-2\\5.1-H\\source\\src\\Shrinking.mat';

async function main() {
  for (let index = 0; index < 100; index++) {
    const models = Models.getInstance();
    const reflection = await models.createModel('Reflection', REFLECTION_PATH);
    const scaling = await models.createModel('Scaling', SCALING_PATH);
    const shrinking = await models.createModel('Shrinking', SHRINK_PATH);
    let r = reflection?.calculate([0, 1])!;
    let r2 = scaling?.calculate([0, 1])!;
    let r3 = shrinking?.calculate([0, 1])!;
    console.group('No.', index, ' result: ');
    console.log(r?.length);
    console.log(r2.length);
    console.log(r3.length);
    console.groupEnd();
  }
}

main();
