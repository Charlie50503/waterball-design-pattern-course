import { CaseRecord } from '../interfaces/caseRecord';

export class CaseRecordDatabase {
  private _caseRecords: CaseRecord[] = [];

  public insert(caseRecord: CaseRecord) {
    this._caseRecords.push(caseRecord);
  }

  public selectAll() {
    return this._caseRecords;
  }
}
