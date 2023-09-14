import { RelationshipDatabase } from './relationshipDatabase';
import { User } from './user';

export class SuperRelationshipAnalyzer {
  private relationshipDatabase = new RelationshipDatabase();
  public init(script: string) {
    const rows = script.split('\r\n');
    rows.forEach((row) => {
      if (row === '' || row === null) {
        return;
      }
      const cols = row.split(' -- ');
      const [firstUserName, secondUserName] = cols;
      this.generateUser(firstUserName);
      this.generateUser(secondUserName);
      this.addFriend(firstUserName, secondUserName);
      this.addFriend(secondUserName, firstUserName);
    });
  }

  private generateUser(userName: string) {
    if (!this.relationshipDatabase.isUserExist(userName)) {
      this.relationshipDatabase.addUser(new User(userName));
    }
  }

  private addFriend(ownerName: string, targetName: string) {
    const owner = this.relationshipDatabase.getUser(ownerName);
    const target = this.relationshipDatabase.getUser(targetName);
    if (target) {
      owner?.addFriend(target);
    } else {
      throw Error('target user is not exist');
    }
  }

  public isMutualFriend(
    targetName: string,
    name2: string,
    name3: string
  ): boolean {
    const name2User = this.relationshipDatabase.getUser(name2);
    const name3User = this.relationshipDatabase.getUser(name3);

    if (
      name2User.isFriendWith(targetName) &&
      name3User.isFriendWith(targetName)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
