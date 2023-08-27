export class IdentityCard {
  private _id!: string;

  constructor(id: string) {
    this.setId(id);
  }

  public setId(value: string) {
    // 身份證字號驗證
    if (!value.match(/^[A-Z]{1}[0-9]{9}$/)) {
      throw new Error('身分證格式錯誤');
    }
    this._id = value;
  }

  getId() {
    return this._id;
  }
}
