import { Gender } from '../enum/gender.enum';
import { IdentityCard } from './IdentityCard';

export class Patient {
  private _idCard!: IdentityCard;
  private _name!: string;
  private _gender!: Gender;
  private _age!: number;
  private _height!: number;
  private _weight!: number;

  constructor(
    idCard: IdentityCard,
    name: string,
    gender: Gender,
    age: number,
    height: number,
    weight: number
  ) {
    this.setIdCard(idCard);
    this.setName(name);
    this.setGender(gender);
    this.setAge(age);
    this.setHeight(height);
    this.setWeight(weight);
  }

  setIdCard(idCard: IdentityCard) {
    this._idCard = idCard;
  }

  setName(name: string) {
    // 正確範圍 1~30
    if (name.length < 1 || name.length > 30) {
      throw new Error('輸入姓名範圍錯誤');
    }
    this._name = name;
  }

  setGender(gender: Gender) {
    this._gender = gender;
  }

  setAge(age: number) {
    // 正確範圍 1~180
    if (age < 1 || age > 180) {
      throw new Error('輸入年齡範圍錯誤');
    }
    this._age = age;
  }

  setHeight(height: number) {
    // 正確範圍 1~500
    if (height < 1 || height > 500) {
      throw new Error('輸入身高範圍錯誤');
    }
    this._height = height;
  }

  setWeight(weight: number) {
    // 正確範圍 1~500
    if (weight < 1 || weight > 500) {
      throw new Error('輸入體重範圍錯誤');
    }
    this._weight = weight;
  }

  getIdCard() {
    return this._idCard;
  }

  getName() {
    return this._name;
  }

  getGender() {
    return this._gender;
  }

  getAge() {
    return this._age;
  }

  getHeight() {
    return this._height;
  }

  getWeight() {
    return this._weight;
  }
}
