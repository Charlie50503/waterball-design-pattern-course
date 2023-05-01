import { Chapter } from './chapter';
import Big from 'big.js';
import { lengthShouldBe, lengthShouldBeBiggerThan } from './utils/length';
import { Adventurer } from './adventurer';
import { Student } from './student';
import { Mission } from './mission';
import { TourGroup } from './tourGroup';

export class Journey {
  private name: string;
  private description: string;
  private price:Big; // 在計算金錢時都要小心，不能使用number來計算
  private chapters:Array<Chapter>;

  private adventurers: Array<Adventurer>;
  private tourGroups:Array<TourGroup>;

  // 初始化 預設值
  constructor(
    name: string,
    description: string,
    price:Big,
    chapters:Array<Chapter>,
    adventurers: Array<Adventurer>,
    tourGroups:Array<TourGroup>
  ){
    // 透過setter變更值
    this.setChapters(chapters);
    this.setName(name);
    this.setDescription(description);
    this.setPrice(price);
    this.setAdventurers(adventurers);
    this.setTourGroups(tourGroups);
  }


  join(student:Student):Adventurer{
    let number = this.adventurers.length + 1; //建立學號

    // 建立與冒險者的雙向關聯
    let adventurer = new Adventurer(number,student,this);
    this.adventurers.push(adventurer);
    // 因為學員類有冒險者類的關係，所以我們要把它放進去
    student.getAdventurers().push(adventurer);


    // 開始第一項任務
    let firstMission = this.getFirstMission();
    adventurer.carryOn(firstMission);


    // 匹配旅團
    const tourGroup = this.matchTourGroup(adventurer);
    tourGroup.add(adventurer);
    // 印出冒險者加入旅團與匹配致旅團，student.account,this.name,tourGroup
    console.log(`${student.getAccount()}, ${tourGroup.number} 加入了旅團`,tourGroup.number);
    


    return adventurer
  }

  matchTourGroup(adventurer:Adventurer):TourGroup{
    if(this.tourGroups.length > 0){
      return this.tourGroups[Math.random() * this.tourGroups.length | 0];
    }
    return new TourGroup(1,this.adventurers);
  }
  //add getter and setter

  getTourGroups(){
    return this.tourGroups
  }
  getFirstMission(): Mission {
    return this.chapters[0].getFirstMission();
  }
  public getName(): string {
    
    return this.name;
  }

  public setName(name: string): void {
    try {
      
      this.name = lengthShouldBe(name,30);
    } catch (error) {
      
    }
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = lengthShouldBe(description,30);
  }

  public getPrice(): Big {
    return this.price;
  }

  public setPrice(price: Big): void {
    this.price = lengthShouldBeBiggerThan(price,new Big(1));
  }

  public setChapters(chapters:Array<Chapter>){
    if(chapters && chapters.length > 0){
      this.chapters = chapters
    }
  }
 
  public getChapters(){
    return this.chapters;
  }


  public setAdventurers(adventurers: Array<Adventurer>) {
    this.adventurers = adventurers
  }

  getAdventurers(): Array<Adventurer> {
    return this.adventurers;
  }

  setTourGroups(value: Array<TourGroup>) {
    if(value){
      this.tourGroups = value
    }
  }
}