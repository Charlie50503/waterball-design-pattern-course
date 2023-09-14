export class User {
  name: string;
  friends: Map<string, User>;

  constructor(name: string) {
    this.name = name;
    this.friends = new Map<string, User>();
  }

  isFriendWith(targetUserName: string) {
    return this.friends.has(targetUserName);
  }

  getName() {
    return this.name;
  }

  addFriend(user: User) {
    if(this.friends.has(user.getName())){
      // do nothing
    }else{
      this.friends.set(user.getName(), user);
    }
  }
}
