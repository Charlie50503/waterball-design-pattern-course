export class Student {
  name: string;
  experience: number;
  jobTitle: string;
  private _availableTimeSlots = new Set<string>();

  language: string;
  constructor(name: string, experience: number,language: string, jobTitle: string, availableTimeSlots: string[] ) {
    this.name = name;
    this.experience = experience;
    this.jobTitle = jobTitle;
    this.availableTimeSlots = new Set(availableTimeSlots);
    this.language = language;
  }

  public get availableTimeSlots(): Set<string> {
    return this._availableTimeSlots;
  }
  public set availableTimeSlots(value: Set<string>) {
    this._availableTimeSlots = value;
  }
}