import { IdentityCard } from './app/interfaces/IdentityCard';
import { PrescriptionDemand } from './app/interfaces/prescriptionDemand';
import { Symptom } from './app/interfaces/symptom';
import { PrescriberFacade } from './prescriberFacade';

async function main() {
  const prescriberFacade = new PrescriberFacade();
  await prescriberFacade.initial(
    'D:\\project\\homework\\waterball-design-pattern-course\\4.1.H\\source2\\test-data\\patients.json',
    'D:\\project\\homework\\waterball-design-pattern-course\\4.1.H\\source2\\test-data\\potentialDiseases.txt'
  );
  await prescriberFacade.run([
    new PrescriptionDemand(new IdentityCard('A123456789'), [
      new Symptom('Cough'),
      new Symptom('Headache'),
      new Symptom('sneeze'),
    ]),
    new PrescriptionDemand(new IdentityCard('B987654322'), [
      new Symptom('sneeze'),
    ]),
    new PrescriptionDemand(new IdentityCard('B987654323'), [
      new Symptom('snore'),
    ]),
  ]);

  prescriberFacade.export('JSON', 'D:\\project\\homework\\waterball-design-pattern-course\\4.1.H\\source2\\output-data');
}

main();
