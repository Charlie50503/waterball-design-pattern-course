import { User } from './user';

export class RelationshipDatabase {
  private users:Map<string, User> = new Map<string, User>();

  public addUser(user: User) {
    this.users.set(user.getName(), user);
  }

  public getUsers() {
    return this.users;
  }

  public getUser(userName:string){
    if(this.users.get(userName)){
      return this.users.get(userName)!;
    }else{
      throw Error(" user is not exist");
    }
  }

  public isUserExist(userName:string){
    return this.users.has(userName);
  }
}
