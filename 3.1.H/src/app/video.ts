export class Video {
  title:string
  description:string
  length:number

  constructor(title:string, description:string, length:number){
    this.title = title
    this.description = description
    this.length = length
  }
}