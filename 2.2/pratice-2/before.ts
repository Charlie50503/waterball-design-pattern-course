class SearchLongestMessageBefore {
  public search(messages: string[]): string {
    let maxLengthMessage = '';
    for (let message of messages) {
      if (message.length > maxLengthMessage.length) {
        maxLengthMessage = message;
      }
      console.log(message);
    }
    return maxLengthMessage;
  }
}

class SearchEmptyMessageIndexBefore {
  public search(messages: string[]): number {
    let index = 0;
    while (index < messages.length && messages[index] !== '') {
      console.log(messages[index]);
      index++;
    }
    return index >= messages.length ? -1 : index;
}

class CountNumberOfWaterBallsBefore {
  public count(messages: string[]): number {
    let count = 0;
    for (let message of messages) {
      if (message === 'WaterBall') {
        count++;
      }
      console.log(message);
    }
    return count;
  }
}
