import { Medicine } from './medicine';
import { PotentialDisease } from './potentialDisease';

export class Prescription {
  private _medicines!: Medicine[] | null;
  private _potentialDisease!: PotentialDisease;
  private _name!: string;
  private _usage!: string;

  constructor(
    medicines: Medicine[] | null,
    potentialDisease: PotentialDisease,
    name: string,
    usage: string
  ) {
    this.setMedicines(medicines);
    this.setPotentialDisease(potentialDisease);
    this.setName(name);
    this.setUsage(usage);
  }

  setMedicines(medicines: Medicine[] | null) {
    this._medicines = medicines;
  }

  setPotentialDisease(potentialDisease: PotentialDisease) {
    this._potentialDisease = potentialDisease;
  }

  setName(name: string) {
    this._name = name;
  }

  setUsage(usage: string) {
    this._usage = usage;
  }

  getMedicines() {
    return this._medicines;
  }

  getPotentialDisease() {
    return this._potentialDisease;
  }

  getName() {
    return this._name;
  }

  getUsage() {
    return this._usage;
  }
}
